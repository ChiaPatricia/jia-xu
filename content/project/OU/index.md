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


|  Model Performance   | Support Vector Regression  | Decision Tree  | GradientBoost  | Random Forest  |
|  ----  | ----  |  ----  | ----  |  ----  |
|   RMSE  | 23.17564056905  |  17.04841050791  |  17.68650127842 |  16.94388847387  |
|   Adjusted R2  |  0.391004912092 |  0.670452452090  | 0.645322077665  |  0.674480908668   |
|   Mean RMSE  | 23.47847806255  |  20.15138032344  | 18.34257947524  |  18.66780891993  |
|   SD  |  0.232164064898  |  0.459108943933  |  0.249612540275  |  0.339479772941  |




Based on the offered features and the result from the ensemble learning, it can be seen from the table that GradientBoost is our best model, even though the error for the training set without cross-validation for the GBoost is higher than for the Random Forest. Random Forest had the lowest RMSE score for the training set without cross-validation, but this model has the problem of overfitting, as this model's performance degraded in the cross-validation, and the SD is relatively high.

# Extension Task

## Task 1: Annotation Task 
We summarized our annotation task in the table below.


|  |  Annotation Task  |  Annotation Description  |
|  ----  | ----  |  ----  |
| 1 | Variable: Score | If the score is < 40, it is a fail, >= 40 and <=100, it is an pass, and if the student does not submit the assessment, no result is recorded. All null scores can be interpreted as non-submissions, so we will fill them out with zeros; null scores will be assigned as passe, as it is ok that most submissions do not fail. |
| 2 | New Variable: Weighted score | How it will be calculated: Multiply the weight of the assignment with its score. Aggregate the data frame per weight * score per module presentation with the sum function. Calculate the total recorded weight of the module calculate weighted scores - divide summed weight*score by total recorded weight of the module |
| 3 | New Variable: Late submission | Calculate the rate of late submission for the assignments that the student did submit. How will be calculated: Calculate the difference between the deadline and the actual submission date. Make a new column - if the difference between dates is more than that), the submission was late. Aggregate by student ID, module, and module presentation. |
| 4 | Merge dataframes | $VLE + VLE materials = total_click_per_student.$   We can merge these two tables with an inner merge as resources with no activity for any student to provide zero information. We will drop week_from, week_to, and date columns. $Registration Info + Courses + Student Info = regCoursesInfo.$ We will inner merge these three tables based on code_module, code_presentation, and id_student. $Assessments + Results = assessments.$ We will inner merge these three tables based on id_assessment. |
| 5 | Missing values | IMD band: Fill them according to the most frequent band for that region. \\Date registration: For the withdrawn students, we will subtract the median value from the registration date to fill these.\\ total_click: We will  replace them with 0s (meaning not interested in it). \\ weighted_score: We will  replace the nan values with 0s (meaning do not make submissions). \\ late_rate: We will replace the nan values with 1.00 (100% late rate). \\ fail_rate: We will replace them with 100% (1.0) (meaning do not make any submissions).  |
| 6 | Drop columns | The is_banked column is dropped along with date_submitted and assessment_type.  |




## Task 2: Fairness Audit 
Fairness is a topic we often mention in recent days, and features with sensitive fairness characteristics may also have an impact on the model prediction. According to reports from UK universities, the degree-awarding gap for Black, Asian, and Minority Ethnic (BAME) students is 13 percent, with similar effects seen when comparing students across other protected attributes such as gender or disability (Bayer et al., 2021). Typically, demographic information such as age, ethnicity, nationality, and religious beliefs are commonly used in most circumstances. 

In the Open University dataset, we found these features are suspicious and worth additional analysis: gender, region, highest_education, imd_band, age_band, disability. Based on the previous regression results, we separated our features into two groups: group 1 only contains fairness-related features as listed above, and group 2 only contains fairness-disrelated features, and group 3 is the original feature set that contains all features. Then we made 3 individual Gradient Boost models and correspondingly applied different feature groups (we chose Gradient Boost because it had been proved to be the best performed regression model during our analysis). The results are shown as below:



|  |  Group 1 (Fairness-related) | Group 2 (Fairness-disrelated) |  Group 3 (Complete)  |
|  ----  | ----  |  ----  |  ----  |
|  RMSE  | 29.46174938633362  |  18.118993632790925  |  18.381595870859417  |
|  Adjusted R2  | 0.0227914023132904  |  0.630394553567488  |  0.6192524105918902  |


It can be seen from our results that deleting fairness-related features in our dataset basically very slightly improves the model performance (as the adjusted R2 slightly increased, while the square root of MSE slightly decreased). But as the adjustment is pretty subtle, we cannot conclude here that fairness-related features have some impacts on our model. However, it is always rigorous to consider these aspects and modify our model to be more realistic, and can predict more precisely. 

## Task 3: Literature Review
Using machine learning models to predict the students’ academic performance has profound meanings. Dabhade et. al. (2021) maintained that these machine learning algorithms can help provide quality advice to educational institutions so that students can enhance their academic performance. 

Various techniques were used worldwide in this area. In India, Haridas et al. (2020) adopted machine learning models to predict the students’ performance of an intelligent tutoring system called AmritaITS. They concluded that the prediction models for summative assessments were considerably improved by formative assessments scores and AmritaITS logs (Haridas et al., 2020). In addition, Chui et al. (2020) adopted an improved conditional generative adversarial network-based deep support vector machine (ICGAN-DSVM) algorithm to predict students' performance under supportive learning via school and family tutoring. 

In our models, the Decision Tree and Random Forest prediction models received relatively good results for predicting the students’ performance. Fortunately, this result is not alone in this field. During Canagareddy D. et al. (2019)’s research about a machine learning model to predict the performance of University students, they concluded that their best prediction model is Random Forest. Also, Decision tree models managed to behave as one of the first-tier models for predicting students’ final performance at an early stage (Tanuar, E. et al., 2018). 


# References
Bayer, V., Hlosta, M., & Fernandez, M. (2021, June). Learning Analytics and Fairness: Do 	Existing Algorithms Serve Everyone Equally?. In International Conference on 	Artificial Intelligence in Education (pp. 71-75). Springer, Cham.

Canagareddy D., Subarayadu K., Hurbungs V. (2019) A Machine Learning Model to Predict 	the Performance of University Students. In: Fleming P., Lacquet B., Sanei S., Deb K., 	Jakobsson A. (eds) Smart and Sustainable Engineering for Next Generation 	Applications. ELECOM 2018. Lecture Notes in Electrical Engineering, vol 561. 	Springer, Cham. https://doi-org.proxy.library.upenn.edu/10.1007/978-3-030-	18240-3_29

Chui, K. T., Liu, R. W., Zhao, M., & De Pablos, P. O. (2020). Predicting students’ performance 	with school and family tutoring using generative adversarial network-based deep 	support vector machine. IEEE Access, 8, 86745–86752. 	https://doi.org/10.1109/access.2020.2992869

Dabhade, P., Agarwal, R., Alameen, K. P., Fathima, A. T., Sridharan, R., & Gopakumar, G. 	(2021). Educational data mining for predicting students’ academic performance 	using machine learning algorithms. Materials Today: Proceedings, 47, 5260–5267. 	https://doi.org/10.1016/j.matpr.2021.05.646

Ghorbani, R., & Ghousi, R. (2020). Comparing different resampling methods in predicting 	students’ performance using Machine Learning Techniques. IEEE Access, 8, 67899–		67911. https://doi.org/10.1109/access.2020.2986809

Haridas, M., Gutjahr, G., Raman, R., Ramaraju, R., & Nedungadi, P. (2020). Predicting school 		performance and early risk of failure from an intelligent tutoring system. Education 		and Information Technologies, 25(5), 3995–4013. https://doi.org/10.1007/s10639-		020-10144-0

Kuzilek, J., Hlosta, M., & Zdráhal, Z. (2017). Open University Learning Analytics
datasets. Scientific Data, 4.

Kuzilek, J., Hlosta, M. & Zdrahal, Z. Open University Learning Analytics dataset. Sci 
Data 4, 170171 (2017). https://doi.org/10.1038/sdata.2017.171

Rastrollo-Guerrero, J. L., Gómez-Pulido, J. A., & Durán-Domínguez, A. (2020). Analyzing and 		predicting students’ performance by means of Machine Learning: A Review. Applied 		Sciences, 10(3), 1042. https://doi.org/10.3390/app10031042 

Tanuar, E., Heryadi, Y., Lukas, Abbas, B. S., & Gaol, F. L. (2018). Using machine learning 	techniques to earlier predict student's performance. 2018 Indonesian Association for 	Pattern Recognition International Conference (INAPR). 	https://doi.org/10.1109/inapr.2018.8626856

Wikipedia contributors. (2021, September 12). Protected group. In Wikipedia, The Free         	Encyclopedia. Retrieved 00:28, November 30, 2021, from 	https://en.wikipedia.org/w/index.php?title=Protected_group&oldid=1043946666 

Wu, S. (2021, June 5). What are the best metrics to evaluate your regression model? 	Medium. Retrieved December 17, 2021, from 	https://towardsdatascience.com/what-are-the-best-metrics-to-evaluate-your-	regression-model-418ca481755b
