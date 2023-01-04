---
title: "Identification of the Most Determinant Demographic and Biological Factors for the Phenotypic and Chronological Age Difference Prediction in the NHANES Cohort"
subtitle: "AMIA 2023 Informatics Summit"
excerpt: "This study developed the relatively simple mathematical model by adding a radiation effect and transverse magnetic field to the physical model, taking into account heat and mass transfer of a permeable, saturated porous medium, infinite oscillating cylindrical plate. "
date: 2022-12-21
author: "Jia Xu, Yuezhi Xie, Yuqin Zhang, Daniele Pala, Li Shen"
draft: false
# layout options: single, single-sidebar
layout: single
categories:
- Python
- Aging
- Data Science
- Bioinformatics
---

![AMIA](featured.jpg)

### Introduction
According to the United Nations, the global population is rapidly aging. 

Several factors contribute to this, such as increased longevity and a general natality rate reduction, especially in Europe and the United States.

Past research has demonstrated that aging is related to the risk of developing numerous diseases, such as cardiovascular and neurodegenerative conditions. 
Several studies have been developing tools and analysis pipelines to identify aging individuals with increased disease or mortality risks. For example, Liu et al. developed a new aging rate indicator named phenotypic age, an epigenetic biomarker of aging obtained by the linear combination of chronological age and 9 clinical biomarkers, that indicates the rate of aging of a person expressed considering their mortality risk and general health conditions, and that can be notably different even in individuals with the same chronological age. Phenotypic age can be computed using the PhenoAge algorithm, that we adopt in this paper. This indicator was demonstrated to be related to mortality risk in a large population cohort, even stratifying by indicators such as age, ethnicity, education, health behaviors and cause of death. This score has been calculated using data coming from the National Health and Nutrition Examination Survey (NHANES) dataset , a large repository that contains laboratory markers, demographic and socioeconomic indicators and survey data of tens of thousands of individuals. 

PhenoAge has been extensively used in numerous scientific research studies, mostly concerning its usefulness in predicting mortality and age-related conditions. However, studies focused on which factors, both biological and demographic/socioeconomic, mostly contribute to increasing the difference between chronological age and phenotypic age, apart from those used for its calculation, are generally lacking. 

This study uses data from a database of human exposomes and phenomes from NHANES published on Dryad to identify which factors have the highest effect in having a phenotypic age that differs greatly from the chronological one.



### References
1. Liu Z, Kuo PL, Horvath S, Crimmins E, Ferrucci L, Levine M. A new aging measure captures morbidity and mortality risk across diverse subpopulations from NHANES IV: a cohort study. PLoS medicine. 2018;15(12):e1002718.

2. Levine ME, Lu AT, Quach A, Chen BH, Assimes TL, Bandinelli S, et al. An epigenetic biomarker of aging for lifespan and healthspan. Aging (Albany NY). 2018;10(4):573.

3. Patel CJ, Pho N, McDuffie M, Easton-Marks J, Kothari C, Kohane IS, et al. A database of human exposomes and phenomes from the US National Health and Nutrition Examination Survey. Scientific data. 2016;3(1):1-10.

4. Kuo CL, Pilling LC, Liu Z, Atkins JL, Levine ME. Genetic associations for two biological age measures point to distinct aging phenotypes. Aging cell. 2021;20(6):e13376.

### Conference
[AMIA 2023 Informatics Summit](https://amia.org/education-events/amia-2023-informatics-summit)

