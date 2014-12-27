"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var {EventEmitter} = require('events');
var assign = require('object-assign');
var WebAPIUtils = require("../utils/WebAPIUtils");

var {ActionTypes} = AppConstants;
var CHANGE_EVENT = 'change';
var _current = null;
var _candidates = {
  '1': {
    id: 1,
    name: '背景與原因',
    avatar: '',
    avatar_square: '',
    status: false
  },
  '2': {
    id: 2,
    name: '憲法 ABC',
    avatar: '',
    avatar_square: '',
    status: false
  },
  '3': {
    id: 3,
    name: '修憲程序',
    avatar: '',
    avatar_square: '',
    status: false
  },
  '4': {
    id: 4,
    name: '人權保障',
    avatar: '',
    avatar_square: '',
    status: false
  },
  '5': {
    id: 5,
    name: '選舉制度',
    avatar: '',
    avatar_square: '',
    status: false
  },
  '6': {
    id: 6,
    name: '中央政府體制',
    avatar: '',
    avatar_square: '',
    status: false
  },
  '7': {
    id: 7,
    name: '由五權改為三權',
    avatar: '',
    avatar_square: '',
    status: false
  },
  '8': {
    id: 8,
    name: '主權者之界定',
    avatar: '',
    avatar_square: '',
    status: false
  }
};

var CandidateStore = assign({}, EventEmitter.prototype, {

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getStatus () {
    var result = {};
    Object.keys(_candidates).map(function (c) {
      return result[c] = _candidates[c].status;
    });
    return result;
  },

  getCurrentCandidate () {
    return _current;
  },

  get (id) {
    return _candidates[id];
  },

  getAll () {
    return Object.keys(_candidates).map((c) => {
      return _candidates[c];
    });
  }
});

CandidateStore.dispatchToken = AppDispatcher.register((payload) => {
  var {action} = payload;
  switch(action.type) {
    case ActionTypes.CHOOSE_CANDIDATE:
      _current=action.id;
      CandidateStore.emitChange();
      break;
    case ActionTypes.STATUS:
      WebAPIUtils.checkStatus(function (err, res) {
        if (err) {
          return console.log(err);
        }
        Object.keys(_candidates).map(function(c, i){
          var allStatus = res.body.data;
          if(allStatus)//this is a workaround
             _candidates[c]['status'] = allStatus[i];
        });
        CandidateStore.emitChange();
      });
      break;
    default:
  }

});

module.exports = CandidateStore;