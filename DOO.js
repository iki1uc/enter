// DOO.js
// Kontrollmodul – Steuerung, IT, Transition

export const DOO = {
    // Status
    active: false,
    control: false,
    transition: false,
    it: false,
    
    // Zähler
    count: { doo: 0, control: 0, transition: 0, it: 0 },

    // DOO aktivieren
    activate() {
        this.active = true;
        this.control = true;
        this.count.doo++;
        return { status: 'ok', message: '◈ DOO aktiviert – Kontrolle bereit', count: this.count.doo };
    },

    // DOO deaktivieren
    deactivate() {
        this.active = false;
        this.control = false;
        this.transition = false;
        this.it = false;
        return { status: 'ok', message: '◈ DOO deaktiviert' };
    },

    isActive() {
        return this.active;
    },

    // CONTROL – Steuerung
    control() {
        if (!this.active) return { status: 'error', message: '❌ DOO nicht aktiv' };
        this.control = true;
        this.count.control++;
        return { status: 'ok', message: '🎮 CONTROL aktiviert', count: this.count.control };
    },

    // TRANSITION
    transition() {
        if (!this.active) return { status: 'error', message: '❌ DOO nicht aktiv' };
        this.transition = true;
        this.count.transition++;
        return { status: 'ok', message: '🌀 TRANSITION aktiviert', count: this.count.transition };
    },

    // IT – Informationstechnologie
    it() {
        if (!this.active) return { status: 'error', message: '❌ DOO nicht aktiv' };
        this.it = true;
        this.count.it++;
        return { status: 'ok', message: '💻 IT aktiviert', count: this.count.it };
    },

    // Reset
    reset() {
        this.active = false;
        this.control = false;
        this.transition = false;
        this.it = false;
        this.count = { doo: 0, control: 0, transition: 0, it: 0 };
        return { status: 'ok', message: '⟲ DOO zurückgesetzt' };
    },

    // Status abrufen
    getStatus() {
        return {
            active: this.active,
            control: this.control,
            transition: this.transition,
            it: this.it,
            count: this.count
        };
    }
};

export default DOO;
