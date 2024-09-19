// Function to calculate cell volume
function cellV(latticeParams) {
    const [a, b, c, alpha, beta, gamma] = latticeParams.map(Math.toRadians);
    const matrix = [
        [a**2, a*b*Math.cos(gamma), a*c*Math.cos(beta)],
        [a*b*Math.cos(gamma), b**2, b*c*Math.cos(alpha)],
        [a*c*Math.cos(beta), b*c*Math.cos(alpha), c**2]
    ];
    
    const determinant = math.det(matrix);
    return Math.sqrt(determinant);
}

// Function to convert lattice vectors to Cartesian coordinates
function latticeVectorsToCartesian(latticeParams) {
    const [a, b, c, alpha, beta, gamma] = latticeParams.map(Math.toRadians);
    const aCartesian = [a, 0, 0];
    const bCartesian = [b * Math.cos(gamma), b * Math.sin(gamma), 0];
    const cCartesian = [
        c * Math.cos(beta),
        c * (Math.cos(alpha) - Math.cos(beta) * Math.cos(gamma)) / Math.sin(gamma),
        c * Math.sin(beta)
    ];
    return [aCartesian, bCartesian, cCartesian];
}

// Function to calculate reciprocal lattice parameters
function reciprocalLatt(latticeParams) {
    const [aCartesian, bCartesian, cCartesian] = latticeVectorsToCartesian(latticeParams);
    const V = cellV(latticeParams);
    
    const aStarCartesian = math.cross(bCartesian, cCartesian).map(v => v / V);
    const bStarCartesian = math.cross(cCartesian, aCartesian).map(v => v / V);
    const cStarCartesian = math.cross(aCartesian, bCartesian).map(v => v / V);

    const alphaStar = angleBetweenVectors(bStarCartesian, cStarCartesian);
    const betaStar = angleBetweenVectors(aStarCartesian, cStarCartesian);
    const gammaStar = angleBetweenVectors(aStarCartesian, bStarCartesian);

    const aStar = math.norm(aStarCartesian);
    const bStar = math.norm(bStarCartesian);
    const cStar = math.norm(cStarCartesian);
    
    return [aStar, bStar, cStar, alphaStar, betaStar, gammaStar];
}

// Function to calculate the angle between two vectors
function angleBetweenVectors(v1, v2) {
    const cosTheta = math.dot(v1, v2) / (math.norm(v1) * math.norm(v2));
    return Math.degrees(Math.acos(cosTheta));
}

// Function to calculate Bragg angle
function braggAngle(hkl, latticeParams, wavelength) {
    const [a, b, c, alpha, beta, gamma] = latticeParams.map(Math.toRadians);
    const [h, k, l] = hkl;
    
    const V = cellV(latticeParams);
    const dHkl = V / Math.sqrt(
        h**2 * (b**2 * c**2 * Math.sin(alpha)**2) +
        k**2 * (a**2 * c**2 * Math.sin(beta)**2) +
        l**2 * (a**2 * b**2 * Math.sin(gamma)**2) +
        2 * h * k * a * b * c**2 * (Math.cos(alpha) * Math.cos(beta) - Math.cos(gamma)) +
        2 * h * l * a * b**2 * c * (Math.cos(alpha) * Math.cos(gamma) - Math.cos(beta)) +
        2 * k * l * a**2 * b * c * (Math.cos(beta) * Math.cos(gamma) - Math.cos(alpha))
    );
    
    const twoTheta = 2 * Math.degrees(Math.asin(wavelength / (2 * dHkl)));
    return [dHkl, twoTheta];
}

// Function to convert energy to wavelength
function evToAngstrom(ev) {
    return 12398.425 / ev;
}
