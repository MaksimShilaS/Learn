import FlyingBatEnemy from "./enemies/FlyingBatEnemy.js";
import GhostEnemy from "./enemies/GhostEnemy.js";
import IdleBatEnemy from "./enemies/IdleBatEnemy.js";
import SawEnemy from "./enemies/SawEnemy.js";

const enemiesFactory = {
    "idleBat": {
        get: (count) => fill(count, () => new IdleBatEnemy())
    },
    "flyingBat": {
        get: (count) => fill(count, () => new FlyingBatEnemy())
    },
    "ghost": {
        get: (count) => fill(count, () => new GhostEnemy())
    },
    "saw": {
        get: (count) => fill(count, () => new SawEnemy())
    }
}

const fill = (count, newInstance) => {
    const arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(newInstance());
    }
    return arr;
}

export default enemiesFactory;