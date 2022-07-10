let currentFloor = 10;
let currentDestinations = [12, 13, 9, 1, 8, 6];
let currentDirection = undefined;

const findNearest = (destinations, current, distance = 1) => {
    if (destinations.length < 1) {
        return undefined;
    }
    if (destinations.length === 1) {
        return destinations[0];
    }
    const nearest = destinations.find((destination) => {
        return current - distance === destination || current + distance === destination;
    });

    if (nearest) {
        return nearest;
    }
    return findNearest(destinations, current, distance + 1);
};

const getDirection = (oldestPressed, nearest, current, prevDirection) => {
    if (Math.abs(oldestPressed - current) < Math.abs(oldestPressed - nearest)) {
        return 'AWAY';
    }
    return 'BACK';
};

const findNearestByDirection = (destinations, current, direction, oldestPressed) => {
    const nearest = findNearest(destinations, current);
    const nearestDirection =
        oldestPressed === current
            ? undefined
            : getDirection(oldestPressed, nearest, current, direction);

    if (
        direction === undefined ||
        (direction === 'BACK' && nearestDirection === 'BACK') ||
        (direction === 'AWAY' && nearestDirection === 'AWAY') ||
        (direction === 'AWAY' && nearestDirection === 'BACK')
    ) {
        return nearest;
    }

    return findNearestByDirection(
        destinations.filter((destination) => destination !== nearest),
        current,
        direction,
        oldestPressed,
    );
};

const move = () => {
    const oldestPressed = currentDestinations[0];
    const nearest = findNearestByDirection(
        currentDestinations,
        currentFloor,
        currentDirection,
        oldestPressed,
    );
    const current = currentFloor;

    currentDirection = getDirection(oldestPressed, nearest, currentFloor, currentDirection);
    if (oldestPressed === nearest) {
        currentDirection = undefined;
    }

    currentFloor = nearest;
    console.log('direction: ', currentDirection);
    console.log(currentDestinations);
    currentDestinations = currentDestinations.filter((item) => item !== nearest);
    console.log('====== >>', current);
    console.log('nearest', nearest);
    console.log('oldest', oldestPressed);
    console.log(currentDirection);
    console.log('\n');
};

move();
move();
currentDestinations.push(9);
console.log('-> pushed 9');
move();
console.log('-> pushed 7');
currentDestinations.push(7);
move();
move();
move();
console.log('-> pushed 8');
currentDestinations.push(8);
move();

move();
move();
move();
move();
