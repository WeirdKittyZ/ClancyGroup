---
layout: post
title: Single Crystal XRD using Bruker D8 Venture Duo
date: 2024-06-2
author: Weird Kitty  
tags: 
  - UsefulStuff 
toc:  true
---

_This is a guide for conducting Single Crystal XRD using Bruker D8 Venture Duo with APEX4._


**On APEX4:**
<mark>**Left side bar**</mark> and <mark>right side window</mark>
1. Create new project New sample (top left) (always save other people’s old projects), fill
in crystal information

**On diffractometer:**
- Mount crystal
- Close the door when detector is moving
- Physically center with goniometer
o Up/down movement is higher one
o Left right is lower one
- Turn on the light bottom at right side of the di􀆯ractometer

**On APEX4:**
<mark>**Left side bar**</mark> and <mark>right side window</mark>
Set UP -> Center Crystal: Click Center once mounted
- Open doors on di􀆯ractometer
- Align once, rotate 90
- Align again, rotate 90
- Align again, rotate 180
- Rotate around to check if it is centered
- Once it can rotate without misalignment use the camara to take measurement of crystal
size (each tick is 20 micron (0.02mm), radius is 100 micron (0.1mm))
- Put the size in Set UP -> Describe
Evaluate -> Determine unit cell
- Run (it will go through each step automatically to find a unit cell), if the unit cell is not
right, you can manually adjust the threshold, and manually go through the process.
Collect -> Calculate Strategy
Anode: Mo, Resolution: 0.4A for solid state
Symmetry: lower than your space group, check the HKL range at top window, make sure cover both
positive and negative HKL
Parameters for the strategy determination:
Crystal to detector: 40mm standard (50mm if long axis), click ok
Shortest normalized exposure time: 0.5
Select Scan Parameter:
Frame angle: 0.5 degree,
Frame time: depending on crystal can change time per step, <5s. we use 2 sec for iridates
Collect -> Run Experiment
Add Crystal video into 2
Append strategy
Validate to make sure it’ll run
Execute
After collection:
Evaluate -> Determine unit cell
Select image (folder at top), don’t use fast scans use actual scans (samplename_001),
when you go to last scan should be _0180
Harvest spots
Min I/signal = 3, harvest
Once harvested, index, index
Pick group, accept, set
Bravais, select one you want
Refine, use more peak, refine until it converge, now have new unit cell
With the new unit cell, start processing:
Reduce data -> integrated images:
Select unit cell you just made
Import runs from experiment (make sure you don’t use the fast scans or use fast scans
when missing low angle data)
resolution limit: 0.4
Refinement options:
XYZ box size to 0.8,0.8,1.2 or 1,1,2 depends on your crystal
Integration options:
More options -> Algorithm -> Monte Carlo simulation: 32, start integration
Reduce data -> Scale
Symmetries: (Laue and Point)
Mu*r : 0.1 or 0.2
Start
Refine
Examine data -> Analyze data (x-prep)
This will export required files for refinement

[Notes](/PostFile/SCXRD.pdf)
