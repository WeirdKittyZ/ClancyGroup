---
layout: post
title: Rietveld Refinement
date: 2024-06-03
author: Weird Kitty
tags: 
  - Crystal-Synthesis-Characterization 
toc:  true
---

_This is a guide on rietveld refinement with FullProf._

## Find CIF file
Find your cif file in <a href="https://icsd-fiz-karlsruhe-de.libaccess.lib.mcmaster.ca/search/basic.xhtml;jsessionid=03FE8BA10802629753885D333D75DAC1
">ICSD</a>. Log in with your MacID. 
- Enter composition (element) + number of elements (if there is impurity)

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
  - **Refinement/simulation**: x-ray, wavelength: Cu (note: I2/I1 = 0)
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
- Minimize chi2. 
- Red: fixed by symmetry. 
	- Cycles of refinement: 5-10
- **First:**
  - Background: d0-d1
  - Profile: factor-scale
  - Run Fullprof program, close, re-load PCR file (yes: save refinement)
    
- **Second:**
  - Instrument: zero
  - Profile: cell parameter
     
- **Third:** change shape  
  - Profile: FWHM Parameter UVW
  - Shape parameter: eta_0

- **Fourth:** fix all refined parameter. 
  - Atom: change B for each element.
  - Oxygen moves a lot, might crush the program.

- **Fifth**: fix all atom refined parameter, restart first and second step.

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


