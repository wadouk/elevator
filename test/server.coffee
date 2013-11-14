server = require '../server/basicserver.js'
assert = require 'assert'
http = require 'http'

describe 'server', ->

  describe "get /", ->
    before ->
      server.listen 8000

    it 'should return 200', (done)->
      http.get 'http://localhost:8000', (res) ->
        assert.equal(200, res.statusCode)
        done()

    it 'should say "Hello, world!"', (done) ->
      http.get 'http://localhost:8000', (res) ->
        data = '';
        res.on 'data', (chunk) -> data += chunk
        res.on 'end', ->
          assert.equal 'Hello, world!\n', data
          done()

    it 'basic commands should return 200', (done) ->
      apis = ["nextCommand","reset","call","go","userHasEntered","userHasExited"]
      nbApi = 0

      callback = (res) ->
        data = '';
        res.on 'data', (chunk) -> data += chunk
        res.on 'end', ->
          assert.equal '200',res.statusCode
          nbApi++
          done() if (nbApi == apis.length)


      http.get('http://localhost:8000/' + api, callback) for api in apis

    after ->
      server.close()




