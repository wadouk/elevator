should = require 'should'
elevator = require '../server/elevator.js'

describe 'Code Elevator module', () ->
   describe '#dummy', () ->
      it 'should return hello', () ->
        elevator.reset();
        should.equal(elevator.nextCommand(),'UP')

      it 'when go to top go down', () ->
        elevator.reset();
        elevator.ca
        should.equal(elevator.nextCommand(),'UP')
      it 'when go to down go top', () ->

