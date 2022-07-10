let currentFloor = 1;
let currentDestinations = [];
let currentDirection = undefined;
let isMoving = false;

console.log("You are currently on 1st floor.");

const rl = require("readline");
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "===> Choose floor: ",
});

function log(message) {
  rl.cursorTo(process.stdout, 0);
  rl.clearScreenDown(process.stdout);
  console.log(message);
  readline.prompt(true);
}

const findNearest = (destinations, current, distance = 1) => {
  if (destinations.length < 1) {
    return undefined;
  }
  if (destinations.length === 1) {
    return destinations[0];
  }
  const nearest = destinations.find((destination) => {
    return (
      current - distance === destination || current + distance === destination
    );
  });

  if (nearest) {
    return nearest;
  }
  return findNearest(destinations, current, distance + 1);
};

const getDirection = (oldestPressed, nearest, current, prevDirection) => {
  if (Math.abs(oldestPressed - current) < Math.abs(oldestPressed - nearest)) {
    return "AWAY";
  }
  return "BACK";
};

const findNearestByDirection = (
  destinations,
  current,
  direction,
  oldestPressed
) => {
  const nearest = findNearest(destinations, current);
  const nearestDirection =
    oldestPressed === current
      ? undefined
      : getDirection(oldestPressed, nearest, current, direction);

  if (
    direction === undefined ||
    (direction === "BACK" && nearestDirection === "BACK") ||
    (direction === "AWAY" && nearestDirection === "AWAY") ||
    (direction === "AWAY" && nearestDirection === "BACK")
  ) {
    return nearest;
  }

  return findNearestByDirection(
    destinations.filter((destination) => destination !== nearest),
    current,
    direction,
    oldestPressed
  );
};

const changeFloor = () => {
  const oldestPressed = currentDestinations[0];
  const nearest = findNearestByDirection(
    currentDestinations,
    currentFloor,
    currentDirection,
    oldestPressed
  );

  currentDirection = getDirection(
    oldestPressed,
    nearest,
    currentFloor,
    currentDirection
  );
  if (oldestPressed === nearest) {
    currentDirection = undefined;
  }

  currentFloor = nearest;
  log("Order of button presses: " + currentDestinations);
  currentDestinations = currentDestinations.filter((item) => item !== nearest);
};

const move = () => {
  if (currentDestinations.length === 0) {
    isMoving = false;
    return undefined;
  }
  isMoving = true;
  changeFloor();
  setTimeout(() => log("📕 Moving to floor: " + currentFloor), 1500);
  setTimeout(() => {
    log("📗 Arrived at: " + currentFloor);
    move();
  }, 4500);
};

readline.prompt();

readline
  .on("line", (input) => {
    const floor = Number(input);
    if (currentFloor === floor) {
      console.log("You are on selected floor already! Floor: ", currentFloor);
      readline.prompt();
      return;
    }
    if (!currentDestinations.includes(floor) && floor <= 10 && floor >= 1) {
      currentDestinations.push(floor);
    }
    if (isMoving === false) move();
    readline.prompt();
  })
  .on("close", () => {
    log("Have a great day!");
    process.exit(0);
  });
