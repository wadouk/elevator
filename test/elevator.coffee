should = require 'should'
elevator = require '../server/elevator.js'

describe 'Code Elevator module', () ->
  describe '#dummy', () ->
    beforeEach ->
      elevator.reset()

    it 'should return NOTHING', () ->
      should.equal(elevator.nextCommand(),'NOTHING')

    it 'when higest go down', () ->
      elevator.currentFloor=elevator.MAX_FLOORS
      should.equal(elevator.nextCommand(),'DOWN')
      should.equal(elevator.currentFloor,elevator.MAX_FLOORS-1)

    it 'when lowest go up without call NOTHING', () ->
      elevator.currentFloor=0
      should.equal(elevator.nextCommand(),'NOTHING')
      should.equal(elevator.currentFloor,0)

    it 'when lowest go up call UP', () ->
      elevator.enableFloor(2)
      elevator.currentFloor=0
      should.equal(elevator.nextCommand(),'UP')
      should.equal(elevator.currentFloor,1)

    it 'when go up stay up', () ->
      elevator.currentFloor=3
      elevator.way='UP'
      should.equal(elevator.nextCommand(),'NOTHING')
      should.equal(elevator.currentFloor,3)

    it 'when go down stay down', () ->
      elevator.currentFloor=3
      elevator.way='DOWN'
      should.equal(elevator.nextCommand(),'NOTHING')
      should.equal(elevator.currentFloor,3)

    it 'when call, open close and up', () ->
      elevator.enableFloor(2)
      elevator.enableFloor(5)
      elevator.currentFloor=2
      elevator.way='UP'
      should.equal(elevator.nextCommand(),'OPEN')
      should.equal(elevator.currentFloor,2)
      should.equal(elevator.nextCommand(),'CLOSE')
      should.equal(elevator.currentFloor,2)
      should.equal(elevator.nextCommand(),'UP')
      should.equal(elevator.currentFloor,3)

    it 'when call highest, open close and down', () ->
      elevator.enableFloor(elevator.MAX_FLOORS)
      elevator.currentFloor=elevator.MAX_FLOORS
      elevator.way='UP'
      should.equal(elevator.nextCommand(),'OPEN')
      should.equal(elevator.currentFloor,elevator.MAX_FLOORS)
      should.equal(elevator.nextCommand(),'CLOSE')
      should.equal(elevator.currentFloor,elevator.MAX_FLOORS)
      should.equal(elevator.nextCommand(),'DOWN')
      should.equal(elevator.currentFloor,elevator.MAX_FLOORS-1)

    it 'when call lowest, down, open close', () ->
      elevator.enableFloor(0)
      elevator.currentFloor=1
      elevator.way='UP'
      should.equal(elevator.nextCommand(),'DOWN')
      should.equal(elevator.currentFloor,0)
      should.equal(elevator.nextCommand(),'OPEN')
      should.equal(elevator.currentFloor,0)
      should.equal(elevator.nextCommand(),'CLOSE')
      should.equal(elevator.currentFloor,0)

    it 'when call at middle and ask to go down, go down', () ->
      elevator.enableFloor(3)
      elevator.enableFloor(0)
      elevator.currentFloor=3
      elevator.way='UP'
      should.equal(elevator.nextCommand(),'OPEN')
      should.equal(elevator.currentFloor,3)
      should.equal(elevator.nextCommand(),'CLOSE')
      should.equal(elevator.currentFloor,3)
      should.equal(elevator.nextCommand(),'DOWN')
      should.equal(elevator.currentFloor,2)

    it 'when call up and down, before down, go down', () ->
      elevator.enableFloor(10)
      elevator.enableFloor(5)
      elevator.enableFloor(0)
      elevator.currentFloor=7
      elevator.way='DOWN'
      should.equal(elevator.nextCommand(),'DOWN')
      should.equal(elevator.currentFloor,6)
      should.equal(elevator.nextCommand(),'DOWN')
      should.equal(elevator.currentFloor,5)
      should.equal(elevator.nextCommand(),'OPEN')
      should.equal(elevator.nextCommand(),'CLOSE')
      should.equal(elevator.nextCommand(),'DOWN')
      should.equal(elevator.currentFloor,4)
      should.equal(elevator.nextCommand(),'DOWN')
      should.equal(elevator.currentFloor,3)


    it 'when call up and down, before up, go up', () ->
      elevator.enableFloor(5)
      elevator.enableFloor(0)
      elevator.currentFloor=2
      elevator.way='UP'
      should.equal(elevator.nextCommand(),'UP')
      should.equal(elevator.currentFloor,3)
      should.equal(elevator.nextCommand(),'UP')
      should.equal(elevator.currentFloor,4)
      should.equal(elevator.nextCommand(),'UP')
      should.equal(elevator.currentFloor,5)
      should.equal(elevator.nextCommand(),'OPEN')
      should.equal(elevator.nextCommand(),'CLOSE')
      should.equal(elevator.nextCommand(),'DOWN')
      should.equal(elevator.currentFloor,4)
      should.equal(elevator.nextCommand(),'DOWN')
      should.equal(elevator.currentFloor,3)


