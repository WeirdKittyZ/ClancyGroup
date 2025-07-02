---
layout: post
title: Rietveld Refinement
date: 2025-07-02
author: Weird Kitty
tags: 
  - Crystal-Synthesis-Characterization 
toc:  true
---

_This is a guide on rietveld refinement with FullProf and GSAS-II._

## Find CIF file
Find your cif file in <a href="https://icsd-fiz-karlsruhe-de.libaccess.lib.mcmaster.ca/search/basic.xhtml;jsessionid=03FE8BA10802629753885D333D75DAC1
">ICSD</a>. Log in with your MacID. 
- Enter composition (element) + number of elements (if there is impurity)
  
# FullProf

## Change file form
- For experimental data in XRDML:
  - Run WinPlotr -> File -> open raw data file -> 58. XRDML multiscans (Panalytical) -> counts
  - File -> save data as INSTRUM_0 file

## Set up ED PCR (double click to save!!)
- Change cif to pcr -> select cif file -> save

### General
- Change title
  
### Pattern 
- Data file/ peak shape:
  - **Data/format**: free format, choose the experimental data converted before.
  - **Refinement/simulation**: x-ray, wavelength: Cu (note: I2/I1 = 0) or Co (note: I2/I1 = 0.5)
  - **Pattern calculation/peak shape** peak shape: pseudo-voigt (Gaussian + Lagrangian distribution); range 
- Background type
  - 6-coefficients polynomial function 
- Excluded region 
	- Use when there is huge impurity peak 

### Phase 
- Change name of phase
- Coeff to calculate the weight: Choose calculated automatically !!!
- Contribution of Patterns:
  - Click x-ray
  - Change peak shape: pseudo-voigt
- Symmetry:
  - Check if info imported correctly from cif 

### Refinement
- This will minimize chi2. 
- Red block: fixed by symmetry.
  - Cycles of refinement: 5-10
  - Reflections ordering: Each cycle
    
- **First:**
  - Background: d0-d3
  - Profile: set factor-scale to 0.003 (DO NOT CLICK) set to some reasonable peak height. 
  - Profile: click cell parameter
  - Run Fullprof program, close, re-load PCR file (yes: save refinement, no: if it collapsed) 
    
- **Second:**
  - Profile: click factor-scale
  - Profile: click cell parameter
     
- **Third:**
  - Background: click all
  - Instrument: zero
    
- **Fourth:** change shape  
  - Profile: FWHM Parameter UVW
  - Shape parameter: eta_0

- **Fifth:** fix all refined parameter. 
  - Atom: change B for each element.
  - Oxygen moves a lot, might crush the program.

- **Sixth**: fix all atom refined parameter, restart first and second step.

### Save file 
Run WinPlotr -> File -> open rieveld data file -> 101. FullProf PRF file 

Save data as multicolumn data 

 
## Two phase refinement
_**Easiest way:** start a new PCR file do one phase refinement, and use refined parameter to do two phase refinement in the original file._

- Second phase need to be entered manually. 
- Run vesta open cif of second phase in vesta. 

- Occupation number:
  - Occu: chemical occupancy(from chemical name, composition) × multiplicity of special position (from site) ÷ general multiplicity (from space group)  

**Phase:** 
- Add another phase, click calculate automatically!!
- Contribution to pattern:
  - Current phase contributes to pattern
  - Change peak shape 
- Symmetry
  - Add space group 

**Refinement:**
- Phase 2: Atom -> manually enter atoms
- Under phase 2 -> profile
- Start refinement

## Info export
At the bottom of SUM file, can read out percentage of two phase. 


# GSAS - II

It is recommended to put powder data file, instrument file (if have any) and the cif file in one folder. Once gsas-ii runs, there will be two windows, **GSAS-II project** and **GSAS-II plots** on the screen. The following steps are mainly performed on GSAS-II project window. A short guide of plot window is provided at the end. 

### Import data file:

For experimental data in XRDML:
- Import -> Powder data -> from Panalytical xrdml (xml) file  -> select data file -> open 
- A new window pops up -> click cancel -> Defaults for CuKa lab data -> Ok (you should see a data tree has been added)
- instrument parameter (under PWDR data tree)  -> select source type (CoKa or CuKa) 
- Sample parameter (under PWDR data tree) -> diffractometer type -> Brag-Brentano

### Import cif file:
- Import -> Phase -> from cif file -> select cif file -> open 
- A new window pops up -> Yes -> name this phase -> Ok -> tick 0) PWDR xxx. xrdml Scan 1 (connect phase info to data)  -> Ok


### Single phase refinement: 
- when refining each parameter, repeat the process until Max shift/sigma ~ 0.1


  - background
    - background function: chebyschev-1
    - number of coeff: 5
    - Calculate -> Refine -> select a folder to save the file -> name it -> save  -> click (ok: save refinement ; cancel: if collapsed)
    - if collapsed, try different background function (a) and number of coeff (b) 

  - Unit cell 
    - click the named phase -> tick Refine unit cell -> Calculate -> Refine
    - leave it ticked, so unit cell will be refined automatically as other parameters are refined

  - Peak shape (refine only ONE parameter at a time)
      - tick Zero -> Calculate -> Refine -> untick
      - repeat the process for U, V, W separately
      - repeat the process for X, Y respectively (click cancel: if it is negative and don’t refine that parameter)


  - Fix atomic position
      - click on the named phase -> Atoms
      - find the heaviest atom according to the periodic table
      - double click the empty box under refine -> select X -> Calculate -> Refine -> untick
      - repeat the steps from the heaviest to the lightest atoms, always leave O at the end 

  - Fix thermal parameter 
    - restart third and fourth step 
    - double click the empty box under refine -> select U -> Calculate -> Refine -> untick


  - Refined plot has automatically saved in the folder so you can just shut down the program


### Two phase refinement: 
- import the second cif file the same way like the first one  
  - refine background
  - refine the second phase
  - click the second named phase
  - data -> tick phase fraction -> Calculate -> Refine (weighted fraction will show the correct percentage) -> untick
  - general -> tick refine unit cell -> Calculate -> Refine -> untick 
- refine the first phase
  - repeat steps in the single phase refinement


### Guide to GSAS-II plot window
- click **house button** -> reset to the original view
- click **four-way arrow** -> drag the plot in all direction -> unclick if you don’t need it 
- click **magnifier** -> draw a rectangle -> zoom in the selected region -> unclick it again if you don’t need it 


