require! <[ request cheerio async fs ]>

base-url = \http://ipa.gitbooks.io/constitution100/content/
links = []
data = {}

function parse-chapter({id, path}:obj, next)
  matched = id.match /(\d+)\.(\d+)/
  err, res, body <- request.get base-url + path
  $ = cheerio.load body, do
    decodeEntities: false
  title = $ '.page-inner h1' .text!trim!
  $ '.page-inner h1' .remove!
  content = $ '.page-inner section' .html!trim!
  data[matched.1][matched.2] = do
    title: title
    content: content
  next null, ''

err, res, body <- request.get base-url + 'index.html'
$ = cheerio.load body
ul = 1
$ '.summary .articles li' .each (index, el) ->
  data[ul] = {} unless data[ul]
  if matched = ($ el .attr 'data-level').match /(\d+)\.(\d+)\.(\d+)/
    data[ul-1][matched.3] = {}
    links.push do
      id: "#{ul-1}.#{matched.3}"
      path: $ el .attr \data-path
  ul += 1 if not ($ el .attr 'data-path').match /chapter_1|(\d+)\.html/ and 3 is ($ el .attr 'data-level').length

err, results <- async.map links, parse-chapter

data |> JSON.stringify |> console.log