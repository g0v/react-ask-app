require! <[ request cheerio async ]>

base-url = \http://ipa.gitbooks.io/constitution100/content/
links = []
data = {}

function parse-chapter({id, path}:obj, next)
  matched = id.match /\d+\.(\d+)\.(\d+)/
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
$ '.summary li' .each (index, el) ->
  if $ el .hasClass 'chapter' and matched = ($ el .attr 'data-level').match /\d+\.(\d+)\.(\d+)/
    data[matched.1] = {} unless data[matched.1]
    data[matched.1][matched.2] = {}
    links.push do
      id: matched.0
      path: $ el .attr \data-path

err, results <- async.map links, parse-chapter

console.log data
