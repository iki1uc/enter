// door-doo-bridge.js
// Verbindet DOO/IT und DOOR zu einem System

import DOO from './DOO.js';
import DOOR from './DOOR.js';

export const DOOR_DOO = {
    doo: DOO,
    door: DOOR,

    // ========================================
    // Kompletter Start
    // ========================================
    start() {
        const dooResult = this.doo.activate();
        const doorResult = this.door.openDoor();
        const transResult = this.door.trans();
        const warbResult = this.door.warb();
        const kanalResult = this.door.kanal();
        
        return {
            status: 'ok',
            message: '🚪 DOOR_DOO SYSTEM STARTED',
            steps: [dooResult, doorResult, transResult, warbResult, kanalResult],
            state: this.getStatus()
        };
    },

    // ========================================
    // Kompletter Stop
    // ========================================
    stop() {
        const doorResult = this.door.closeDoor();
        const dooResult = this.doo.deactivate();
        return {
            status: 'ok',
            message: '⏹ DOOR_DOO SYSTEM STOPPED',
            steps: [doorResult, dooResult]
        };
    },

    // ========================================
    // Full Pipeline: DOO → DOOR → TRANS → WARB → KANAL
    // ========================================
    fullPipeline() {
        // 1. DOO aktivieren
        const doo = this.doo.activate();
        if (doo.status === 'error') return { error: 'DOO fehlgeschlagen', step: doo };
        
        // 2. DOOR öffnen
        const door = this.door.openDoor();
        if (door.status === 'error') return { error: 'DOOR fehlgeschlagen', step: door };
        
        // 3. TRANS
        const trans = this.door.trans();
        if (trans.status === 'error') return { error: 'TRANS fehlgeschlagen', step: trans };
        
        // 4. WARB
        const warb = this.door.warb();
        if (warb.status === 'error') return { error: 'WARB fehlgeschlagen', step: warb };
        
        // 5. KANAL
        const kanal = this.door.kanal();
        if (kanal.status === 'error') return { error: 'KANAL fehlgeschlagen', step: kanal };
        
        // 6. API
        const api = this.door.api();
        
        return {
            status: 'ok',
            message: '✅ DOOR_DOO FULL PIPELINE COMPLETE',
            steps: [doo, door, trans, warb, kanal, api],
            state: this.getStatus()
        };
    },

    // ========================================
    // Status
    // ========================================
    getStatus() {
        return {
            doo: this.doo.getStatus(),
            door: this.door.getStatus(),
            connected: this.doo.active && this.door.open,
            phase: this.doo.active ? 
                (this.door.api ? 'API' : 
                 this.door.kanal ? 'KANAL' : 
                 this.door.warb ? 'WARB' : 
                 this.door.transition ? 'TRANS' : 
                 this.door.open ? 'DOOR' : 'DOO') 
                : 'INACTIVE'
        };
    }
};

export default DOOR_DOO;
