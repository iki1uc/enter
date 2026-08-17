// door-doo-bridge.js
// Verbindet DOO/IT und DOOR zu einem System

import DOO from './DOO.js';
import DOOR from './DOOR.js';

export const DOOR_DOO = {
    doo: DOO,
    door: DOOR,

    // Kompletter Start
    start() {
        const dooResult = this.doo.activate();
        const doorResult = this.door.openDoor();
        return {
            doo: dooResult,
            door: doorResult,
            system: 'DOO/IT → DOOR verbunden'
        };
    },

    // Kompletter Stop
    stop() {
        const doorResult = this.door.closeDoor();
        const dooResult = this.doo.deactivate();
        return {
            door: doorResult,
            doo: dooResult,
            system: 'System gestoppt'
        };
    },

    // Full Pipeline: DOO → DOOR → TRANS → WARB → KANAL
    fullPipeline() {
        const steps = [];

        // 1. DOO aktivieren
        const doo = this.doo.activate();
        steps.push(doo);

        // 2. DOOR öffnen
        const door = this.door.openDoor();
        steps.push(door);

        // 3. TRANS
        const trans = this.door.trans();
        steps.push(trans);

        // 4. WARB
        const warb = this.door.warb();
        steps.push(warb);

        // 5. KANAL
        const kanal = this.door.kanal();
        steps.push(kanal);

        // 6. API
        const api = this.door.api();
        steps.push(api);

        return {
            steps: steps,
            status: 'FULL PIPELINE COMPLETE',
            doo: this.doo.getStatus(),
            door: this.door.getStatus()
        };
    },

    // System-Status
    getStatus() {
        return {
            doo: this.doo.getStatus(),
            door: this.door.getStatus(),
            connected: this.doo.active && this.door.open
        };
    }
};

export default DOOR_DOO;
