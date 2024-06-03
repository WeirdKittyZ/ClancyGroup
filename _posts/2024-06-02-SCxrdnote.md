---
layout: post
title: Single Crystal XRD
date: 2024-06-2
author: Weird Kitty  
tags: 
  - UsefulStuff 
toc:  false
---

_This is a guide for conducting Single Crystal XRD using Bruker D8 Venture Duo with APEX4._


**On APEX4:**

<mark>Left Side Bar</mark> and **_Right Side Window_**

Create new project New sample (top left) (always save other people’s old projects), fill in crystal information.

**On diffractometer:**
- Mount crystal
- Close the door when detector is moving
- Physically center with goniometer
    - Up/down movement is higher one
    - Left right is lower one
- Turn on the light bottom at right side of the diffractometer

**On APEX4:**

<mark>Left Side Bar</mark> and **_Right Side Window_**

<mark>Set UP</mark> -> <mark>Center Crystal</mark>: Click **_Center_** once mounted

**On diffractometer:**
- Open doors on diffractometer (always close the door when detector is moving)
- Align once, rotate 90
- Align again, rotate 90
- Align again, rotate 180
- Rotate around to check if it is centered
- Once it can rotate without misalignment use the camara to take measurement of crystal. _size (each tick is 20 micron (0.02mm), radius is 100 micron (0.1mm))_

**On APEX4:**
1. Put the size in <mark>Set UP</mark> -> <mark>Describe</mark>

2. <mark>Evaluate</mark> -> <mark>Determine unit cell</mark>
- **_Run_** (it will go through each step automatically to find a unit cell), if the unit cell is not right, you can manually adjust the threshold (MIn.I/sigma to 3), and manually go through the process.
  
3. <mark>Collect</mark> -> <mark>Calculate Strategy</mark>
- **_Anode_**: Mo, **_Resolution_**: 0.4A for solid state
- **_Symmetry_**: lower than your space group, check the HKL range at top window, make sure cover both positive and negative HKL.
  
4. Parameters for the strategy determination:
- **_Crystal to detector_**: _40mm_ standard (50mm if long axis), click ok
- **_Shortest normalized exposure time_**: 0.5
- **_Select Scan Parameter_**:
  - **_Frame angle_**: 0.5 degree
  - **_Frame time_**: depending on crystal can change time per step, <5s. we use 2 sec for iridates
  
5. <mark>Collect</mark> -> <mark>Run Experiment</mark>
- Add Crystal video into 2
- Append strategy
- **_Validate_** to make sure it’ll run
- **_Execute_**

6. After collection, find a unit cell with better data: <mark>Evaluate</mark> -> <mark>Determine unit cell</mark>
- Select image (folder at top), don’t use fast scans use actual scans (samplename_001)
- when you go to last scan should be _0180
- **_Harvest spots_**
  - Min I/signal = 3, harvest
  - Once harvested, index, index
  - Pick group, accept, set
  - Bravais, select one you want
  - Refine, use more peak, refine until it converge, now have new unit cell

- With the new unit cell, start processing:

7. <mark>Reduce data</mark> -> <mark>integrated images</mark>:
- Select unit cell you just made
- Import runs from experiment (make sure you don’t use the fast scans or use fast scans when missing low angle data)
- **_Resolution limit_**: 0.4
- **_Refinement options_**:
    - XYZ box size to _0.8, 0.8, 1.2_ or _1,1,2_ depends on your crystal
- **_Integration options_**:
    - More options -> Algorithm -> _Monte Carlo simulation_: 32, **_start integration_**

8. <mark>Reduce data</mark> -> <mark>Scale</mark>
- **_Symmetries_**: (Laue and Point Group)
- Mu*r : 0.1 or 0.2, probably not need to change
- **_Start_**
- **_Refine_**

9. <mark>Examine data</mark> -> <mark>Analyze data (x-prep)</mark>
This will export required files for refinement, follow the step by x-prep.

10. Start refinement. 

[PDF Version](/PostFile/SCXRD.pdf)
