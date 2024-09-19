// Utility function to convert degrees to radians
function degToRad(deg) {
    return deg * (Math.PI / 180);
}

// Class for lattice calculations
class LatticeCalculations {
    constructor() {}

    // Cell Volume Calculation
    cellV(latticeParams) {
        const [a, b, c, alpha, beta, gamma] = latticeParams;
        const alphaRad = degToRad(alpha);
        const betaRad = degToRad(beta);
        const gammaRad = degToRad(gamma);

        // Volume matrix
        const matrix = [
            [a ** 2, a * b * Math.cos(gammaRad), a * c * Math.cos(betaRad)],
            [a * b * Math.cos(gammaRad), b ** 2, b * c * Math.cos(alphaRad)],
            [a * c * Math.cos(betaRad), b * c * Math.cos(alphaRad), c ** 2]
        ];

        // Calculate determinant and volume
        const determinant = this.determinant3x3(matrix);
        const V = Math.sqrt(determinant);
        return V;
    }

    // Determinant calculation for a 3x3 matrix
    determinant3x3(matrix) {
        return (
            matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[2][1] * matrix[1][2]) -
            matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
            matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
        );
    }

    // Convert lattice vectors to Cartesian coordinates
    latticeVectorsToCartesian(latticeParams) {
        const [a, b, c, alpha, beta, gamma] = latticeParams;
        const alphaRad = degToRad(alpha);
        const betaRad = degToRad(beta);
        const gammaRad = degToRad(gamma);

        const aCartesian = [a, 0, 0];
        const bCartesian = [
            b * Math.cos(gammaRad),
            b * Math.sin(gammaRad),
            0
        ];
        const cCartesian = [
            c * Math.cos(betaRad),
            c * (Math.cos(alphaRad) - Math.cos(betaRad) * Math.cos(gammaRad)) / Math.sin(gammaRad),
            c * Math.sin(betaRad)
        ];

        return [aCartesian, bCartesian, cCartesian];
    }

    // Reciprocal lattice parameters calculation
    reciprocalLatt(latticeParams) {
        const [aCartesian, bCartesian, cCartesian] = this.latticeVectorsToCartesian(latticeParams);
        const V = this.cellV(latticeParams);

        const aStarCartesian = this.crossProduct(bCartesian, cCartesian).map(val => val / V);
        const bStarCartesian = this.crossProduct(cCartesian, aCartesian).map(val => val / V);
        const cStarCartesian = this.crossProduct(aCartesian, bCartesian).map(val => val / V);

        return {
            aStar: this.magnitude(aStarCartesian),
            bStar: this.magnitude(bStarCartesian),
            cStar: this.magnitude(cStarCartesian)
        };
    }

    // Cross product of two vectors
    crossProduct(v1, v2) {
        return [
            v1[1] * v2[2] - v1[2] * v2[1],
            v1[2] * v2[0] - v1[0] * v2[2],
            v1[0] * v2[1] - v1[1] * v2[0]
        ];
    }

    // Magnitude of a vector
    magnitude(vector) {
        return Math.sqrt(vector.reduce((sum, val) => sum + val ** 2, 0));
    }

    // Angle between two vectors
    angleBetweenVectors(v1, v2) {
        const dotProduct = v1.reduce((sum, val, idx) => sum + val * v2[idx], 0);
        const mag1 = this.magnitude(v1);
        const mag2 = this.magnitude(v2);
        return Math.acos(dotProduct / (mag1 * mag2)) * (180 / Math.PI);
    }

    // Bragg angle calculation
    braggAngle(hkl, latticeParams, wavelength) {
        const [h, k, l] = hkl;
        const [a, b, c, alpha, beta, gamma] = latticeParams;
        const alphaRad = degToRad(alpha);
        const betaRad = degToRad(beta);
        const gammaRad = degToRad(gamma);

        // Calculate unit cell volume
        const V = Math.sqrt(
            a ** 2 * b ** 2 * c ** 2 * (1 - Math.cos(alphaRad) ** 2 - Math.cos(betaRad) ** 2 - Math.cos(gammaRad) ** 2 + 2 * Math.cos(alphaRad) * Math.cos(betaRad) * Math.cos(gammaRad))
        );

        const dHkl = V / Math.sqrt(
            h ** 2 * b ** 2 * c ** 2 * Math.sin(alphaRad) ** 2 +
            k ** 2 * a ** 2 * c ** 2 * Math.sin(betaRad) ** 2 +
            l ** 2 * a ** 2 * b ** 2 * Math.sin(gammaRad) ** 2
        );

        const twoTheta = 2 * Math.asin(wavelength / (2 * dHkl)) * (180 / Math.PI);
        return { dHkl, twoTheta };
    }
}

export { LatticeCalculations };
