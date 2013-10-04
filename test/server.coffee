should = require 'should'
elevator = require '../server/elevator.js'

describe 'Code Elevator module', () ->
   describe '#dummy', () ->
      it 'should return hello', () ->
        elevator.reset()
        should.equal(elevator.nextCommand(),'UP')

      it 'when higest go down', () ->
        elevator.reset()
        elevator.stair=5
        should.equal(elevator.nextCommand(),'DOWN')
        should.equal(elevator.stair,4)

      it 'when lowest go up', () ->
        elevator.reset()
        elevator.stair=0
        should.equal(elevator.nextCommand(),'UP')
        should.equal(elevator.stair,1)

      it 'when go up stay up', () ->
        elevator.reset()
        elevator.stair=3
        elevator.way='UP'
        should.equal(elevator.nextCommand(),'UP')
        should.equal(elevator.stair,4)
      it 'when go down stay down', () ->
        elevator.reset()
        elevator.stair=3
        elevator.way='DOWN'
        should.equal(elevator.nextCommand(),'DOWN')
        should.equal(elevator.stair,2)

      it 'when call, open close and up', () ->
        elevator.reset()
        elevator.call({atFloor:2})
        elevator.stair=2
        elevator.way='UP'
        should.equal(elevator.nextCommand(),'OPEN')
        should.equal(elevator.stair,2)
        should.equal(elevator.nextCommand(),'CLOSE')
        should.equal(elevator.stair,2)
        should.equal(elevator.nextCommand(),'UP')
        should.equal(elevator.stair,3)

      it 'when call highest, open close and down', () ->
        elevator.reset()
        elevator.call({atFloor:5})
        elevator.stair=5
        elevator.way='UP'
        should.equal(elevator.nextCommand(),'OPEN')
        should.equal(elevator.stair,5)
        should.equal(elevator.nextCommand(),'CLOSE')
        should.equal(elevator.stair,5)
        should.equal(elevator.nextCommand(),'DOWN')
        should.equal(elevator.stair,4)

      it 'when call lowest, open close and up', () ->
        elevator.reset()
        elevator.call({atFloor:0})
        elevator.stair=0
        elevator.way='UP'
        should.equal(elevator.nextCommand(),'OPEN')
        should.equal(elevator.stair,0)
        should.equal(elevator.nextCommand(),'CLOSE')
        should.equal(elevator.stair,0)
        should.equal(elevator.nextCommand(),'UP')
        should.equal(elevator.stair,1)

