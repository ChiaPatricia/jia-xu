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



As we were applying regression methods in our design, we chose to judge the model performances based on evaluation indexes (Wu, S.) as below:

|  Evaluation Features   |  Description |
|  ----  | ----  |
|  Adjusted R2 | It measures how much variability in dependent variables can be explained by the model. The adjusted R2 will also penalize additional independent variables added to the model and adjust the metric to prevent over-fitting issues. |
| MSE  | It is an absolute measure of the goodness for the fit and calculates an absolute number on how much your predicted results deviate from the actual number. |
| RMSE  | It is the square root of MSE. It brings it back to the same level of prediction error and is easier for interpretation. |


## Support Vector Regression 
The multiple Linear regression using all our features selected is doing badly, as expected, with a R square of around 0.35. We will next use machine learning regression and models to see if our predictions improve. 

Support Vector Regression seeks not to minimize the squared error as in the linear regression, but to minimize coefficients. Compared to the original multiple linear regression model, Support Vector regression has an adjusted R-square of around 0.39. The training error of these two models is basically the same: approximately 23.18 for Support Vector Regression and about 23.91 for the multiple linear regression. Overall, this is a rather slight improvement, and we may need to further investigate a better model.

## Decision Tree 
Decision Trees are divided into Classification and Regression Trees. Regression trees are needed when the response variable is numeric or continuous. In our case, we exploited the decision regression trees as we have numeric variables in our feature set.

Unlike the Support Vector regression, our Decision Tree regression shows a significantly better result compared to the multiple linear regression. The training error (RMSE) for the Decision Tree model is around 17 and the adjusted R square is around 0.67. As the multiple linear regression explains about only 23% of the variation in our model, we witnessed an approximately 191% increase about the adjusted R square. Therefore, we can say that the decision tree model is doing a relatively good job.


## Gradient Boost 
Gradient Boost is a popular machine learning algorithm that tries to find the best model prediction performance step by step (using an ensemble of weak predictive models, and the ensembled model can have better performance compared to individual ones). In our model, Gradient Boost can be called as the best model with a relatively small square root of prediction error (RMSE) of 17.69, and relatively small validation error (mean RMSE = 18.34, SD = 0.25). And the adjusted R2 shows that the model can explain 64.5% of the total variance.

## Random Forest 
A random forest is a meta estimator that fits several classifying decision trees on various sub-samples of the dataset and uses averaging to improve the predictive accuracy and control over-fitting. The result of the Random Forest regression model looks great. Training error (RMSE = 16.94) is not much lower than validation error (mean RMSE = 18.67, SD = 0.34). 

## Ensemble Learning
To better conclude which regression model is performing better, we also applied ensemble learning techniques in regression here (which is widely accepted as a method for combining predictions from different regression models). To better improve the precision, we chose the stacking ensemble method, which assigns different weights to different individual models, and then fit a new linear regression model, which takes predictions from four regression models as features. The newly produced ensemble learning linear regression model’s intercept and coefficients are as below:

|  Intercept   | Coefficient 1  | Coefficient 2  | Coefficient 3  | Coefficient 4  |
|  ----  | ----  |  ----  | ----  |  ----  |
|  0.606318586476  | -0.13609429  |  0.03771186  | 0.70655808  |  0.38731542  |


Therefore, we can see that predictions from the Gradient Boost model have been assigned the largest weight, and predictions from the Random Forest model have been assigned the second largest weight, which proves the good judgment of Gradian Boost prediction results made in the primary task.

## Best Regression Model Evaluation 
To do this we need to have a look at how the model performed on the training set and in cross-validation.

