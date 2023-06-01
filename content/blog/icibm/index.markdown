---
title: "Clustering Alzheimer’s Disease Subtypes via Similarity Learning and Graph Diffusion"
excerpt: "Alzheimer's disease (AD), a complex neurodegenerative disorder affecting millions globally, presents diagnostic and treatment challenges due to its heterogeneous nature. This study targets the identification of homogeneous AD subtypes with unique clinical and pathological characteristics to overcome these issues. Using an innovative approach with unsupervised clustering, the multi-kernel similarity learning framework SIMLR, and graph diffusion, we analyzed MRI-derived cortical thickness measurements in 829 patients with AD and mild cognitive impairment (MCI). The unique clustering methodology we used, untested in AD subtyping before, outperformed traditional clustering methods, notably mitigating noise interference in subtype detection. Five distinctive subtypes emerged, differing significantly in biomarkers, cognitive status, and other clinical features. A subsequent genetic association study validated these subtypes, uncovering potential genetic connections."
date: 2023-07-16
author: "Tianyi Wei, Shu Yang, Davoud Ataee Tarzanagh, Jingxuan Bao, Jia Xu, Patryk
Orzechowski, Joost B. Wagenaar, Qi Long, Li Shen"
draft: false
# layout options: single, single-sidebar
layout: single
categories:
- Alzheimer's Disease
- Similarity Learning
- Bioinformatics
---

![ICIBM](featured.jpg)

### Introduction
Alzheimer's disease (AD) is a prevalent neurodegenerative disorder that poses a significant challenge to the medical community due to its inherent heterogeneity, which obstructs our understanding of its etiology and complicates treatment efforts. Identifying AD subtypes using machine learning (ML) and cluster analysis has become a critical research focus, with such subtypes promising to illuminate divergent neurodegenerative paths and aid in drug development.

However, conventional clustering methods, which rely on predefined metrics, often suffer from high noise levels in data and struggle to generalize across platforms and biological experiments. To counteract these limitations, we utilize the manifold learning framework SIMLR, which learns a suitable similarity metric from input data. It is particularly effective for tackling AD's heterogeneity and diverse clinical presentations.

In addition, we employ a graph diffusion strategy to reduce the impact of noise in our analysis. While this strategy has proved effective in signal processing and genomics data analysis, its application in AD dataset analysis and brain MRI studies has been less explored.

In this study, we utilize cortical thickness measurements from the Alzheimer’s Disease Neuroimaging Initiative (ADNI) database and propose to use similarity learning and graph diffusion to identify AD subtypes. We focus on cognitively normal individuals, Mild Cognitive Impairment patients, and AD patients, aiming to provide valuable insights into AD's progression and subtype differentiation. We also conduct a targeted genetic association analysis to further validate our findings and reveal potential genetic bases for different AD subtypes.


### Conference
[International Conference on Intelligent Biology and Medicine (ICIBM 2023)](https://icibm2023.iaibm.org/)
