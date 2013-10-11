should = require 'should'
elevator = require '../server/elevator.js'

describe 'Code Elevator module', () ->
   describe '#dummy', () ->
      it 'should return hello', () ->
        elevator.reset()
        should.equal(elevator.nextCommand(),'UP')

      it 'when higest go down', () ->
        elevator.reset()
        elevator.currentFloor=5
        should.equal(elevator.nextCommand(),'DOWN')
        should.equal(elevator.currentFloor,4)

      it 'when lowest go up', () ->
        elevator.reset()
        elevator.currentFloor=0
        should.equal(elevator.nextCommand(),'UP')
        should.equal(elevator.currentFloor,1)

      it 'when go up stay up', () ->
        elevator.reset()
        elevator.currentFloor=3
        elevator.way='UP'
        should.equal(elevator.nextCommand(),'UP')
        should.equal(elevator.currentFloor,4)

      it 'when go down stay down', () ->
        elevator.reset()
        elevator.currentFloor=3
        elevator.way='DOWN'
        should.equal(elevator.nextCommand(),'DOWN')
        should.equal(elevator.currentFloor,2)

      it 'when call, open close and up', () ->
        elevator.reset()
        elevator.call({atFloor:2})
        elevator.go({floorToGo:5})
        elevator.currentFloor=2
        elevator.way='UP'
        should.equal(elevator.nextCommand(),'OPEN')
        should.equal(elevator.currentFloor,2)
        should.equal(elevator.nextCommand(),'CLOSE')
        should.equal(elevator.currentFloor,2)
        should.equal(elevator.nextCommand(),'UP')
        should.equal(elevator.currentFloor,3)

      it 'when call highest, open close and down', () ->
        elevator.reset()
        elevator.call({atFloor:5})
        elevator.currentFloor=5
        elevator.way='UP'
        should.equal(elevator.nextCommand(),'OPEN')
        should.equal(elevator.currentFloor,5)
        should.equal(elevator.nextCommand(),'CLOSE')
        should.equal(elevator.currentFloor,5)
        should.equal(elevator.nextCommand(),'DOWN')
        should.equal(elevator.currentFloor,4)

      it 'when call lowest, open close and up', () ->
        elevator.reset()
        elevator.call({atFloor:0})
        elevator.currentFloor=0
        elevator.way='UP'
        should.equal(elevator.nextCommand(),'OPEN')
        should.equal(elevator.currentFloor,0)
        should.equal(elevator.nextCommand(),'CLOSE')
        should.equal(elevator.currentFloor,0)
        should.equal(elevator.nextCommand(),'UP')
        should.equal(elevator.currentFloor,1)

      it 'when call at middle and ask to go down, go down', () ->
        elevator.reset()
        elevator.call({atFloor:3})
        elevator.go({floorToGo:0})
        elevator.currentFloor=3
        elevator.way='UP'
        should.equal(elevator.nextCommand(),'OPEN')
        should.equal(elevator.currentFloor,3)
        should.equal(elevator.nextCommand(),'CLOSE')
        should.equal(elevator.currentFloor,3)
        should.equal(elevator.nextCommand(),'DOWN')
        should.equal(elevator.currentFloor,2)


