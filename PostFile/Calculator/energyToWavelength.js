// Function to convert energy in eV to wavelength in Angstrom
class EnergyToWavelength {
    constructor() {}

    evToAngstrom(ev) {
        // Convert energy (eV) to wavelength (Angstrom)
        const result = 12398.425 / ev;
        return result;
    }
}

export { EnergyToWavelength };
