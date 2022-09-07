export const STATES = {
    STANDING_RIGHT: 0,
    STANDING_LEFT: 1,
    JUMPING_RIGHT: 2,
    JUMPING_LEFT: 3,
    FALLING_RIGHT: 4,
    FALLING_LEFT: 5,
    RUNNING_RIGHT: 6,
    RUNNING_LEFT: 7,
    SITTING_RIGHT: 8,
    SITTING_LEFT: 9,
}

export function newStates(player) {
    const states = [];
    states[STATES.STANDING_RIGHT] = new StandingRight(player);
    states[STATES.STANDING_LEFT] = new StandingLeft(player);
    states[STATES.JUMPING_RIGHT] = new JumpingRight(player);
    states[STATES.JUMPING_LEFT] = new JumpingLeft(player);
    states[STATES.FALLING_RIGHT] = new FallingRight(player);
    states[STATES.FALLING_LEFT] = new FallingLeft(player);
    states[STATES.RUNNING_RIGHT] = new RunningRight(player);
    states[STATES.RUNNING_LEFT] = new RunningLeft(player);
    states[STATES.SITTING_RIGHT] = new SittingRigth(player);
    states[STATES.SITTING_LEFT] = new SittingLeft(player);
    return states;
}

class State {
    constructor(state, frameY, framesCount, player) {
        this.state = state;
        this.frameY = frameY;
        this.framesCount = framesCount;
        this.player = player;
        this.actions = [];
    }

    init() {
        this.player.frameY = this.frameY;
        this.player.frameX = 0;
        this.player.framesCount = this.framesCount;
    }

    update(input) {
        const action = this.actions[input];
        if (action) {
            action(this.player);
        }
    }
}

export class StandingRight extends State {
    constructor(player) {
        super('STANDING RIGHT', STATES.STANDING_RIGHT, 7, player);
        this.actions = {
            "PRESS left": (player) => player.setState(STATES.RUNNING_LEFT),
            "PRESS right": (player) => player.setState(STATES.RUNNING_RIGHT),
            "PRESS down": (player) => player.setState(STATES.SITTING_RIGHT),
            "PRESS up": (player) => player.setState(STATES.JUMPING_RIGHT),
        };
    }

    init() {
        super.init();
        this.player.vx = 0;
    }
}

export class StandingLeft extends State {
    constructor(player) {
        super('STANDING LEFT', STATES.STANDING_LEFT, 7, player);
        this.actions = {
            "PRESS left": (player) => player.setState(STATES.RUNNING_LEFT),
            "PRESS right": (player) => player.setState(STATES.RUNNING_RIGHT),
            "PRESS down": (player) => player.setState(STATES.SITTING_LEFT),
            "PRESS up": (player) => player.setState(STATES.JUMPING_LEFT),
        };
    }

    init() {
        super.init();
        this.player.vx = 0;
    }
}

export class RunningRight extends State {
    constructor(player) {
        super('RUNNING RIGHT', STATES.RUNNING_RIGHT, 9, player);
        this.actions = {
            "PRESS left": (player) => player.setState(STATES.RUNNING_LEFT),
            "RELEASE right": (player) => player.setState(STATES.STANDING_RIGHT),
            "PRESS down": (player) => player.setState(STATES.SITTING_RIGHT),
            "PRESS up": (player) => player.setState(STATES.JUMPING_RIGHT),
        };
    }

    init() {
        super.init();
        this.player.vx = 0;
        this.player.vx += this.player.maxVX;
    }
}

export class RunningLeft extends State {
    constructor(player) {
        super('RUNNING LEFT', STATES.RUNNING_LEFT, 9, player);
        this.actions = {
            "PRESS right": (player) => player.setState(STATES.RUNNING_RIGHT),
            "RELEASE left": (player) => player.setState(STATES.STANDING_LEFT),
            "PRESS down": (player) => player.setState(STATES.SITTING_LEFT),
            "PRESS up": (player) => player.setState(STATES.JUMPING_LEFT),
        };
    }

    init() {
        super.init();
        this.player.vx = 0;
        this.player.vx -= this.player.maxVX;
    }
}

export class SittingRigth extends State {
    constructor(player) {
        super('SITTING RIGHT', STATES.SITTING_RIGHT, 5, player);
        this.actions = {
            "PRESS left": (player) => player.setState(STATES.SITTING_LEFT),
            "RELEASE down": (player) => player.setState(STATES.STANDING_RIGHT)
        };
    }

    update(input) {
        super.update(input);
        if (this.player.vx > 0) {
            this.player.vx -= this.player.slideDamping;
        } else {
            this.player.vx = 0;
        }
    }
}

export class SittingLeft extends State {
    constructor(player) {
        super('SITTING LEFT', STATES.SITTING_LEFT, 5, player);
        this.actions = {
            "PRESS right": (player) => player.setState(STATES.SITTING_RIGHT),
            "RELEASE down": (player) => player.setState(STATES.STANDING_LEFT)
        };
    }

    update(input) {
        super.update(input);
        if (this.player.vx < 0) {
            this.player.vx += this.player.slideDamping;
        } else {
            this.player.vx = 0;
        }
    }
}


export class JumpingRight extends State {
    constructor(player) {
        super('JUMPING RIGHT', STATES.JUMPING_RIGHT, 7, player);
        this.actions = {
            "PRESS left": (player) => player.setState(STATES.JUMPING_LEFT),
        };
    }

    init() {
        super.init();
        if (this.player.onGround()) {
            this.player.vy -= this.player.maxVY;
        }
        this.player.vx = this.player.maxVX * 0.5;
    }

    update(input) {
        super.update(input);
        if (this.player.onGround()) {
            this.player.setState(STATES.STANDING_RIGHT);
        }
        if (this.player.vy > 0) {
            this.player.setState(STATES.FALLING_RIGHT);
        }
    }
}

export class JumpingLeft extends State {
    constructor(player) {
        super('JUMPING LEFT', STATES.JUMPING_LEFT, 7, player);
        this.actions = {
            "PRESS right": (player) => player.setState(STATES.JUMPING_RIGHT),
        };
    }

    init() {
        super.init();
        if (this.player.onGround()) {
            this.player.vy -= this.player.maxVY;
        }
        this.player.vx = -this.player.maxVX * 0.5;
    }

    update(input) {
        super.update(input);
        if (this.player.vy > 0) {
            this.player.setState(STATES.FALLING_LEFT);
        }
    }
}

export class FallingRight extends State {
    constructor(player) {
        super('FALLING RIGHT', STATES.FALLING_RIGHT, 7, player);
        this.actions = {
            "PRESS left": (player) => player.setState(STATES.FALLING_LEFT),
        };
    }

    init() {
        super.init();
        this.player.vx = this.player.maxVX * 0.5;
    }

    update(input) {
        super.update(input);
        if (this.player.onGround()) {
            this.player.setState(STATES.STANDING_RIGHT);
        }
    }
}

export class FallingLeft extends State {
    constructor(player) {
        super('FALLING LEFT', STATES.FALLING_LEFT, 7, player);
        this.actions = {
            "PRESS right": (player) => player.setState(STATES.FALLING_RIGHT),
        };
    }

    init() {
        super.init();
        this.player.vx = -this.player.maxVX * 0.5;
    }

    update(input) {
        super.update(input);
        if (this.player.onGround()) {
            this.player.setState(STATES.STANDING_LEFT);
        }
    }
}