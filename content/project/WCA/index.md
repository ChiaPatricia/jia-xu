---
title: "Fulton Bank Customer Default Prediction"
subtitle: "Wharton Customer Analytics Fulton Bank Datathon"
excerpt: "This was my very first and unique datathon experience. This datathon was composed of teams made up of both Fulton Bank employees and Penn students challenged with developing insights and recommendations for Fulton Bank using their data around selected business challenges in Consumer and Small Business, Fulton Financial Advisors, Information Technology, Marketing, and Risk Management."
date: 2022-04-01
author: "Jia Xu"
draft: false
tags:
  - hugo-site
categories:
  - Python
  - package
layout: single
links:
- icon: door-open
  icon_pack: fas
  name: website
  url: https://wca.wharton.upenn.edu/students/student-datathons/

---



![Wharton Customer Analytics Fulton Bank Datathon](featured-hex.jpg)

[Wharton Customer Analytics](https://wca.wharton.upenn.edu/students/student-datathons/) connect industry with researchers and students with the goal of innovating the field of data analytics, fostering new relationships and creating dynamic thought leadership. This unique datathon experience was composed of teams made up of both Fulton Bank employees and Penn students challenged with developing insights and recommendations for Fulton Bank using their data around selected business challenges in Consumer and Small Business, Fulton Financial Advisors, Information Technology, Marketing, and Risk Management.

---

# MARCH 18 – APRIL 1, 2022

This unique datathon experience was composed of teams made up of both Fulton Bank employees and Penn students challenged with developing insights and recommendations for Fulton Bank using their data around selected business challenges in Consumer and Small Business, Fulton Financial Advisors, Information Technology, Marketing, and Risk Management.

# ABOUT FULTON BANK

Since Fulton Bank opened its doors in 1882, they have strived to deliver the best banking experience for their customers. Today, as part of Fulton Financial Corporation, a $25 billion financial services holding company, Fulton Bank offers a broad array of financial products and services in Pennsylvania, New Jersey, Maryland, Delaware, and Virginia.

Fulton Bank is proud to offer convenience in neighborhoods across the region through over 200 financial centers and specialty offices and almost 300 ATMs


# Our Project: Risk Management

\textbf{Project Type}: Customer Lifetime Value

\textbf{Business Question}: Can we build a model that predicts which customers will default? Can it outperform existing models? Can we find clusters of the kinds of customers who default?







# Data cleaning & visualization

The basic characteristics of the dataset and the potential difficulties that we would run into in data cleaning. 

Our dataset has a size of 290, 000 rows * 200 columns. It is extremely imbalanced with 99% of non-default and only 1% of default cases. Some column titles are difficult to interpret and the data dictionary is not comprehensive. 


Based on these characteristics, we decided on the following Exploratory Data Analysis  approaches. 
First, we examined all column types, the distribution of default cases, missing and unique values, and finally anomalies. We used common data science stacks such as Pandas and Numpy to perform data cleaning and EDA. We discovered that there were undefined and unstructured categorical variables and many null values. To have a better sense of the data, we categorized columns by their meanings and filtered out those that would be hard to explain in the models. We left one column each to represent date, time and id. We dropped columns with high correlations with each other, because they would have strong interaction effects and thus affect model outcomes. 


After preliminary cleaning, we moved forward to feature engineering and decided to use one hot encoding to structure categorical variables. We manually encoded variables  with ambiguous abbreviations in the text  and ran one-hot encoding on them,  so that they wouldn't be automatically coded into uneven values and could be accurately explained in the machine learning models later.


We visualized the correlations by the categories that we made earlier, so that we can get a sense of their effects on default. By plotting correlation graphs, we identified basic trends between variables to prepare further EDA. For example, variables about delinquency and risk rating scores are highly correlated with default. 


# Model 

Our team ran five models in total and chose the best performing ones based on comparisons of accuracy and recall. 


Before constructing our models, we first used Principal Component Analysis to project the high-dimensional data into 3 dimensions. We noticed that default and non-default customers actually do not form separate clusters. We also evaluated the performance of the previous model results presented in the dataset. The previous model had an accuracy rate of 91% and was able to identify 43% of the actual default, but only 6% of the predicted default cases were correct. From this model forward, we aim to look for models that can raise the overall accuracy and achieve a better balance between precision and recall. 

We presented Linear discriminant analysis, decision tree, and extreme gradient boosting, each of which performs better than the previous model in different ways.


The linear Discriminant Analysis model is one of the newest models in credit risk scoring techniques. It is valued so highly in the market because it reduces the number of features to achieve a more manageable data size before classification. The model finds linear combinations of features in order to separate default versus non-default. We chose LDA over PCA because PCA ignores the actual class labels for default versus non-default, so we only used PCA as a reference case to visualize our high-dimensional data, but focused on the results of LDA.

Our model achieved 98.8% overall accuracy, correctly identified 22.4% of actual default cases, and out of all the positive default predictions, 38.1% were correct. This is 7% higher in accuracy and a much better balance between precision and recall than the previous model. We then drew a feature coefficients graph and ranked their importance in their effect on default. We can see that,  delinquency days count, risk rating score and indicator for term loans, are among the top ranked features. 


The second model of our choices is Decision Tree. We choose this algorithm because unlike many other machine learning models which are close to black boxes, decision tree can provide a graphical and intuitive way to understand what our algorithm is actually doing, so it’s much easier to offer sensible interpretation. The feature ranking graph demonstrates the significance of delinquency count and risk rating score in predicting default, but more importantly, the graph shows that the mortgage collateral and remaining months left in the loan are highly relevant to the possibility of default. 

The model has the outcomes of 98.0% overall accuracy, 20.6% recall, 19.1% precision. 


Lastly, since decision tree performs not as well as Linear Discriminant Analysis, we looked for another tree algorithm and we chose XGboost, which is also called extreme gradient boosting, as our third model to present.

XGboost is a decision-tree-based ensemble algorithm that uses a gradient boosting framework to create multiple tree models and combine them to produce improved results. Our model achieved 98.9% overall accuracy, identified 18.3% of actual default cases, and out of all the positive predictions,  65% were correct. We also created the visualizations for the shap value, which is a metric of quantifying the contribution that each feature brings to the prediction of default rate. We find that factors such as loan term count, customer balance amount and interest rate are of high importance.

We also tried isolation forests and logistic regression, but we won’t dive further into them because their results are not as optimized. 

Now that we have covered our models’ logistics and performances. Then we will take you to the next section – cross referencing and business insights.


# Cross Referencing 

To answer the question of how to find clusters of customers who are most likely to default, our team cross-referenced the results of the optimized models and our exploratory data analysis. Here are the feature correlation graphs by category. It tells us the relevance of a variable in each category to default. With the outcomes of the models and information on feature rankings, we came to the following conclusions. 


First, third party indicators are robust in accurately predicting default. 
Indicators representing third party risk rating score, credit score and pools of impaired loans rank relatively high in all three model predictions and show high correlations with default.

Second, features that were traditionally used to predict credit score show high performance in our models too. Variables such as delinquency time and amount, the rate of utilization, and customers’ balance amounts are highly correlated to default. 

Third, loan terms and line types are also useful in predicting default. Count of months remaining on the loan shows significance in the XGboost model. Among three line types, the rank of correlation with default are term loans, credit loans, and non-revolving loans. 

Fourth, among all collateral types accepted by Fulton Bank, movable assets such as car title loans and stocks show a higher correlation with default than unmovable assets such as mortgages and assignment loans, but the Decision tree model told us that mortgage as a collateral type is very significant in predicting default.

Fifth, the location, time and the market segment of the businesses are of importance too. Specifically, owner occupied commercial real estate and investment property are two market segments that show high influence on default in the machine learning models. Among the five regions of businesses, Maryland, Virginia and New Jersey have the highest rate of default. Along the timeline of the data, the highest default happened in June 2019, but drastically decreased in 2020 when COVID hit. 
Cross-referencing between models and EDA showed us the levels of importance of features in each category to the default rate, and thus set us a great theoretical foundation to give recommendations. 



# Recommendation 

Based on our previous outcomes, we gaved five recommendations for each category.
 
First, Fulton Bank should closely monitor macro fluctuations in the market. The agreed-upon interest rate for /each loan, directly affects default rate. 
Also, the default rate decreased during Covid, so Fulton bank should also pay attention to default rate when economics recover. 
Moreover, Maryland, Virginia and New Jersey, have a higher chance of default. 
 
Second, segments of investment property and owner occupied commercial real estate stand out in the models, Fulton Bank should track customers with real estate loans that are commercial or related to investment. 
 
Third, Customers with line types of credit loans and term loans are more likely to default. So, Fulton Bank should monitor both flexible and inflexible repayment schedules of the loans.
 
Fourth, Fulton Bank should watch customers whose collateral type are mortgages and moveable assets, such as car titles.
Those whose collateral types are life insurance or bonds, are not relevant to default rate.
 
Lastly, conventional credit score determinants are important in predicting default all the time.
To evaluate customers’ ability to meet obligations of loan agreements, Fulton Bank should monitor customers' financial health by delinquency, account balances and utilization of credits.
 
