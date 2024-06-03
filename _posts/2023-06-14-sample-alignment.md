---
layout: post
title: Sample Alignment at QM2 beamline
date: 2023-06-14
author: 
  - Chatty Owl
  - Weird Kitty  
tags: 
  - UsefulStuff 
  - QM2
toc:  true
---

_This is a guide on sample alignment on QM2 beamline at CHESS for REXS. It could be generalized to any 4-circle diffractometer._

Also see the <a href="https://suchismitasarker.github.io/CHESS-ID4B-QM2/">Beamline Reference</a>

## Align Sample in the Beam
1. Umvr cryz or tw cryz (Want to make sure that all axies of rotation are decoupled) -> Need at least 90 of in plane rotation, so that x and y are perpendicular to each other.

2. Using the beam to align the sample: Set the beam perpendicular to x-movement, then we find the beam by doing a long scan along x and z to find the sample (lup cryz for height scan/ cryx) for x scan). We are now in the beam and aligned in x.

3. Rotate phi by 90 deg, now y is perpendicular to the beam. Long scan along y and z to align the beam.
Note: when we have full rotation, techniques used to completely decouple the axies is: start by one dire ction (say x), rotate by phi 90 deg to go to y. Then, rotate 180 eg to go to –y, then 270 to go to –x. SPEC commands:

```sh
FOURC> umvr samz 0.1 (relative motion of the sample movement up (+) and down (-))
FOURC> umv phi 0
FOURC> umv phi 180 Move x and y to make the sample to the cursor
FOURC> umv phi 90
FOURC> umv phi 270 Do it iteratively until the center of the axis match the sample position
```

4.  Set expected lattice parameters (SPEC command: setlat).


## Defining the Orientation Matrix
1. Orient the crystal such that the beam is scattering off of a known plane. To do this, move detector to corresponding hkl (umvr tth) and move theta to tth/2.

2. If you have an area detector, look for a peak. If you successfully identify one, move the peak into the detector’s region of integration (ROI) (by moving chi and 2theta). If not, tweak theta and/or theta (since it might be off screen). If not, the plane has been misidentified. Make sure that the found peak is relatively close to the detector’s ROI.

3. Optimizing the peaks by doing line scans on theta, tth, chi and phi. In a four circle configuration, one of these angles will be redundant, so we usually fix chi. When we optimize tth, we’re moving the detector, such that it is centered onto the maximum intensity of the scattered signal. When we line scan th, we’re moving the sample such that maximum intensity of signal reaches the detector. With chi, we’re rotating the sample in the same manner. Do this iteratively
   
SPEC commands:
```sh
lup th –0.5 0.5 20 0.1
Umv th pl_xMAX
Lup tth –0.5 0.5 20 0.1
Umv tth pl_xMAX
Lup chi –0.5 0.5 20 0.1
Umv chi CEN
```

_Here we use CEN instead of pl_xMAX, because at QM2, the beam is wide in chi._

4. Now we do a th2th scan to check the d-spacing, which gives us the lattice parameters. Theory: th2th fixes direction of Q and changes its magnitude (so we’re traveling along the same Q).
Example: th2th –1 1 200 1

5. Do a nice theta scan, which will tell us about the quality of the crystal, i.e. the mosaic of the crystal (number of d-spacings along a direction present, thus telling us number of grains). Fixing magnitude of Q and changing its direction

6. Set or0 (which is the first vector that will be used in the orientation matrix).
If you have full rotation (which will probably not be at QM2), then, find the orthogonal Q vector to or0 by:
- move chi by 90 deg
- move tth and th =tth/2 to or1 hkl
- rotate phi until you see a peak.

_Notes: When you choose an orientation vector, choose a peak that has strong intensity; high angle is better than low angle (resolution is better)._

If you don’t have full rotation, set a fake orientation vector that is 90 degrees from the first vector. Either go onsim, umvr chi 90 or (th 90 then by phi):

- Calculate the corresponding hkl to get 2th.
- Now uan tth tth/2.
- Set or1 to the chosen hkl.
- offsim
- Calculate an accessible hkl. Uan tth th. Then rotate around phi to find a peak. The reason we do this: When we set up the fake orientation vector, we chose an orientation that is perpendicular to the first vector in plane (bu we don’t know what phi is). So, to find the tip of the new vector, we must rotate about phi until we see a peak.

_Note: If the peak is too far off in wh, then it is probably wrong._

- set this as or1. Change lattice parameters (SPEC: setlat) such that or0 and or1 give close numbers in hkl.
- Test the orientation matrix by checking for at least 3 peaks that are not parallel to or0 and or1.
- **Happy Hunting!**

[PDF Version](/PostFile/Aligning_QM2.pdf)

[Weird Kitty's version:](/PostFile/Aligning2_QM2.pdf)
