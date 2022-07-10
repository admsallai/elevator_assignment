# Elevator assignment

### Author: Adam Sallai

Non graphical, console elevator logic (app) written in JS. IDE - VScode.

## How to use

The only thing you need to run this non-graphical simulator is terminal and Node.js installed. Run an app in terminal using 'node elevator.js'. Quit app using ctrl + c.

If you don't have Node.js installed, I reccomend to visit this link to read how to do so: https://nodejs.dev/learn/how-to-install-nodejs

## Solution description

Elevator is programmed to operate between 10 floors. Once you start an elevator app, elevator is on the first floor. Use numbers on your keyboard to move an elevator between floors. Once you type a number from 1-10 and press 'Enter', elevator starts moving towards floor celected. Even while elevator is moving, you can freely add as many floors as you want to queve. Elevator will visit these added floors using algorithm described below.

## Algorithm description

Imagine, someone is using elevator to go from 1st to 5th floor. Than from 5th floor to 3rd floor etc. Theres nothing special in that case and elevator is moving from one floor to other.

But again, imagine that elevator is moving from 1st to 5th floor, but while doing that, there are another two pressed buttons/choosen floors, let's say 3 and 9. Once elevator ends the first task, it needs to decide which direction it will go next. We could consider order of pressed buttons, but it would be more effective to travel smaller distance to 3rd floor and then go back to floor 9.

But what if someone choose floor 2 again, while elevator is moving from floor 5 to 3? (We still need to go to floor 9.) From 3rd floor it is still closer to continue to 2nd floor than to go all the way up to 9th floor. And from 2nd is closer to 3rd, from 3rd to 2nd again etc. There is posibility to never reach the 9th floor in that scenario, if the algorithm was only based on counting distance between current and nearest floor. Anyway, algorithm will continue using counting distance in this case and go down, but once it change the direction towards 9th floor, it will only stop on selected floors along the way (even if they were selected later then 9) and ignore new choosen floors in other direction. After rechhing 9th floor it can change direction again to continue in visiting other selected floor.

If you select floor that elevator is currently at, elevator wont move.
