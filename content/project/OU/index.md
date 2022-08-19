---
title: "Evaluating Academic Performance of Students Learning in Open University"
subtitle: "MSSP 608 Practical Machine Learning Methods Final Project"
excerpt: "Predicting students’ academic performance at school using regression methods is not a new area of interest. Machine learning methods, however, are relatively new in this field and it has been flourishing in recent years. According to Ghorbani and Ghousi (2020), due to technological advancements, predicting students’ performance at school is among the most beneficial and significant research topics nowadays. Therefore, we believe that it is a meaningful area for us to focus on and we decide to analyze the Open University Learning Analytics Dataset to study the student’s academic performance."
date: 2021-12-07
author: "Jia Xu, Yamei Lu, YufeiQin"
draft: false
tags:
  - Project
categories:
  - Machine Learning
  - Python
# layout options: single or single-sidebar
layout: single
---



![Open University Learning Analytics Dataset](featured-hex.png)

---


# Introduction
Predicting students' academic performance at school using regression methods is not a new area of interest. Machine learning methods, however, are relatively new in this field and it has been flourishing in recent years. According to Ghorbani and Ghousi (2020), due to technological advancements, predicting students’ performance at school is among the most beneficial and significant research topics nowadays. Therefore, we believe that it is a meaningful area for us to focus on and we decide to analyze the Open University Learning Analytics Dataset to study the student’s academic performance.

Rastrollo-Guerrero, et al. examined nearly 70 papers in their review published in the year 2020 and concluded that the most widely used technique for predicting students’ performance was supervised learning, as it gives accurate and credible results. To be specific, SVM (Support Vector Machine), DT (Decision Tree), NB (Naïves Bayes), and RF (Random Forest) have also been well-studied algorithmic proposals that gave good outcomes (Rastrollo-Guerrero, et al., 2020). Therefore, in this study, we will hopefully try to examine the Open University Dataset using SVM, DT, Gradient Boost, and RF regression.

# Primary Task
For the primary task part, we would like to use the Open University Learning Analytics Dataset to apply our analysis. This is an open dataset collection that collects data from Open University’s presented courses, student demographic data, and aggregated clickstream data of students’ behavior interactions in the Virtual Learning Environment (VLE). This dataset collection contains 7 separate tables, including information about 22 courses, 32,593 students’ information and their individual assessment results, and their interactions with the VLE represented by daily summaries of student clicks (10,655,280 entries) (Kuzilek, J., Hlosta, M. & Zdrahal, Z) . 

For our analysis, we would like to mainly focus on students’ performance in different courses (more specifically, their scores won from different classes), and forecast their scores in the future based on the course features and student demographic features. As we are predicting numeric scores, we would apply some different regression methods and compare their prediction performances. Before officially applying different regression models, we have done data pre-processing (like deleting useless columns and calculating new features, replacing null values with reasonable numbers, and using techniques such as one-hot code to transfer nominal features into numeric ones, etc.)

After pre-processing and merging datasets, we have chosen features as listed for regression:

|  Feature Name   | Description  |
|  ----  | ----  |
| code_module  | Code name of the module, which serves as the identifier. |
| code_presentation  | Code name of the presentation. It consists of the year and “B” for the presentation starting in February and “J” for the presentation starting in October. |
|  gender | The student’s gender. |
|  region | Identifies the geographic region, where the student lived while taking the module-presentation. |
|  highest_education | Highest student education level on entry to the module presentation. |
| imd_band  | Specifies the Index of Multiple Depravation band of the place where the student lived during the module-presentation. |
| age_band  | Band of the student’s age. |
|  num_of_prev_attempts | The number times the student has attempted this module. |
|  studied_credits | The total number of credits for the modules the student is currently studying. |
|  disability | Indicates whether the student has declared a disability. |
| date_registration  | The date of student’s registration on the module presentation, this is the number of days measured relative to the start of the module-presentation (e.g., the negative value -30 means that the student registered to module presentation 30 days before it started). |
|  module_presentation_length (length) | Length of the module-presentation in days. |
| total_click(sum_click)  | The number of times a student interacts with the material in that day |

