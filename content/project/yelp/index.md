---
title: "Yelp Challenge 2019"
subtitle: "Yelp Inc. is an American company that develops the Yelp.com website and the Yelp mobile app, which publish crowd-sourced reviews about businesses. Yelp has made their data available to public and launched Yelp challenge. The dataset is a subset of our businesses, reviews, and user data in JSON format. "
excerpt: "The goals in this study are 1) to identify important words associated with positive ratings and negative ratings, and 2) to predict ratings using different methods."
date: 2022-03-30
author: "Jia Xu"
draft: false
tags:
  - Project
categories:
  - Machine Learning
  - R
  - Data Mining
  - Data Science
# layout options: single or single-sidebar
layout: single
---



![Tachyons Logo Script](featured-hex.png)

---

For this case study, we downloaded the [data](https://www.yelp.com/dataset/download) and took a 20k subset from **review.json**. *json* is another format for data. It is flexible and commonly-used for websites. Each item/subject/sample is contained in a brace *{}*. Data is stored as **key-value** pairs inside the brace. *Key* is the counterpart of column name in *csv* and *value* is the content/data. Both *key* and *value* are quoted. Each pair is separated by a comma. The following is an example of one item/subject/sample.

```{json}
{
  "key1": "value1",
  "key2": "value2"
}
```


**Data needed:** yelp_review_20k.json available [HERE](yelp_review_20k.json).

**yelp_review_20k.json** contains full review text data including the user_id that wrote the review and the business_id the review is written for. Here's an example of one review.

```{json}
{
    // string, 22 character unique review id
    "review_id": "zdSx_SD6obEhz9VrW9uAWA",

    // string, 22 character unique user id, maps to the user in user.json
    "user_id": "Ha3iJu77CxlrFm-vQRs_8g",

    // string, 22 character business id, maps to business in business.json
    "business_id": "tnhfDv5Il8EaGSXZGiuQGg",

    // integer, star rating
    "stars": 4,

    // string, date formatted YYYY-MM-DD
    "date": "2016-03-09",

    // string, the review itself
    "text": "Great place to hang out after work: the prices are decent, and the ambience is fun. It's a bit loud, but very lively. The staff is friendly, and the food is good. They have a good selection of drinks.",

    // integer, number of useful votes received
    "useful": 0,

    // integer, number of funny votes received
    "funny": 0,

    // integer, number of cool votes received
    "cool": 0
}
```

## Goal of the study

The goals are 

1) Try to identify important words associated with positive ratings and negative ratings. Collectively we have a sentiment analysis.  

2) To predict ratings using different methods. 

## 1. JSON data and preprocessing data

i. Load *json* data

The *json* data provided is formatted as newline delimited JSON (ndjson). It is relatively new and useful for streaming.
```{json}
{
  "key1": "value1",
  "key2": "value2"
}
{
  "key1": "value1",
  "key2": "value2"
}
```

The traditional JSON format is as follows.
```{json}
[{
  "key1": "value1",
  "key2": "value2"
},
{
  "key1": "value1",
  "key2": "value2"
}]
```


We use `stream_in()` in the `jsonlite` package to load the JSON data (of ndjson format) as `data.frame`. (For the traditional JSON file, use `fromJSON()` function.)

```{r}
pacman::p_load(jsonlite,tm,wordcloud)
yelp_data <- jsonlite::stream_in(file("data/yelp_review_20k.json"), verbose = F)
str(yelp_data)  

# different JSON format
# tmp_json <- toJSON(yelp_data[1:10,])
# fromJSON(tmp_json)
```

**Write a brief summary about the data:**
Output names of columns:
```{r}
names(yelp_data)
```

We have four numerical variables. Look at the summary statistics:
```{r}
summary(yelp_data%>%select(stars, useful, funny, cool))
```

The data deals with Yelp review information. For each of the review, we have the star rating ranging from 1-5. This is our goal of prediction. Three other numerical variables, `useful`, `funny` and `cool` are also included, but they are high skewed with most of the values being 0. We also have the detailed review content stored in the variable `text`, and the `date` when the review is posted.


a) Which time period were the reviews collected in this data?
```{r}
yelp_data$date <- as.Date(yelp_data$date)
min(yelp_data$date)
max(yelp_data$date)
```

The time period is from 2004-10-19 to 2018-10-04.

b) Are ratings (with 5 levels) related to month of the year or days of the week? Only address this through EDA please. 

```{r}
yelp_data$months <- months(yelp_data$date)
yelp_data$weekdays <- weekdays(yelp_data$date)
# pie(table(weekdays), main="Proportion of reviews") 
# pie(table(months), main="Proportion of reviews")  
```

```{r}
yelp_data %>% 
  group_by(months) %>%
  summarise(avg_rating = mean(stars))
```
```{r}

yelp_data%>%
  ggplot(aes(x =  months, fill = as.factor(stars)))+geom_bar(position = 'fill')+ scale_fill_grey()
```



```{r}
yelp_data %>% 
  group_by(weekdays) %>%
  summarise(avg_rating = mean(stars))
```

```{r}
yelp_data%>%
  ggplot(aes(x =  weekdays, fill = as.factor(stars)))+geom_bar(position = 'fill')+ scale_fill_grey()
```

Based on the above plots, we can see that the distribution of stars are similar among weekdays and months. Thus, ratings is not related to month of the year or days of the week



ii. Document term matrix (dtm)
 
 Extract document term matrix for texts to keep words appearing at least .5% of the time among all 20000 documents. Go through the similar process of cleansing as we did in the lecture. 
 
```{r}
yelp_text <- yelp_data$text

# Turn texts to corpus
yelp.corpus  <- VCorpus(VectorSource(yelp_text))


# Control list for creating our DTM within DocumentTermMatrix
# Can tweak settings based off if you want punctuation, numbers, etc.
control_list <- list( tolower = TRUE, 
                      removePunctuation = TRUE,
                      removeNumbers = TRUE, 
                      stopwords = stopwords("english"), 
                      stemming = TRUE)
# dtm with all terms:
yelp.dtm.long  <- DocumentTermMatrix(yelp.corpus, control = control_list)
#inspect(yelp.dtm.long)

# kick out rare words 
yelp.dtm<- removeSparseTerms(yelp.dtm.long, 1-.005)  
```
 

a) Briefly explain what does this matrix record? What is the cell number at row 100 and column 405? What does it represent?

```{r}
as.matrix(yelp.dtm[100,405])

```

The row of the matrix describes each document and the column describes the words in the documents. The value of the matrix means the number of time the corresponding word appears in the document. So cell number at rwo 100 and column 405 has a value of  0 and it represents that the word except doesn't appear in the document 100.

b) What is the sparsity of the dtm obtained here? What does that mean?

```{r}
inspect(yelp.dtm)
```

The sparsity of the dtm is 97% and it represents the proportion of sparse or zero entries in the entire matrix.

iii. Set the stars as a two category response variable called rating to be "1" = 5,4 and "0"= 1,2,3. Combine the variable rating with the dtm as a data frame called data2. 

```{r}
n<-nrow(yelp_data)
rating <- rep("0", n)
rating[yelp_data$stars >= 4] = "1"
data2 <-data.frame( rating,as.matrix(yelp.dtm) )  
data2$rating<-as.factor(rating)
```


## Analysis

Get a training data with 13000 reviews and the 5000 reserved as the testing data. Keep the rest (2000) as our validation data set. 

```{r}
set.seed(1)

idx_train <- sample(n,13000)
idx_no_train <- which(!seq(1:n) %in% idx_train)
idx_test <- sample(idx_no_train, 5000)
idx_val <- which(!idx_no_train %in% idx_test)
 
data2.train <- data2[idx_train,]
data2.test <- data2[idx_test,]
data2.val <- data2[idx_val,]
```

## 2. LASSO

i. Use the training data to get Lasso fit. Choose lambda.1se. Keep the result here.

```{r}
y <- data2.train$rating
X1 <- sparse.model.matrix(rating~., data=data2.train)[, -1]
set.seed(2)
result.lasso <- cv.glmnet(X1, y, alpha=.99, family="binomial")
```
```{r}
coef.1se <- coef(result.lasso, s="lambda.1se")  
```


ii. Feed the output from Lasso above, get a logistic regression. 
	
a) Pull out all the positive coefficients and the corresponding words. Rank the coefficients in a decreasing order. Report the leading 2 words and the coefficients. Describe briefly the interpretation for those two coefficients. 

```{r}
positive_coef <- coef.1se[which(coef.1se >0),] [-1]%>%sort(decreasing = TRUE)
positive_coef%>%head(2)
```

On average, each additional time the word awesom appears in the comment is associated with a 1.1169 increase in the log odds of the rating and  each additional time the word amaz appears in the comment is associated with a 1.006 increase, correspondingly

b) Make a word cloud with the top 100 positive words according to their coefficients. Interpret the cloud briefly.

```{r}
top_100_pos<-positive_coef%>%head(100)
cor.special <- brewer.pal(8,"Dark2")  
wordcloud(names(top_100_pos), top_100_pos, # make a word cloud
          colors=cor.special, ordered.colors=F)
```

The larger size words have the higher coefficient in our model. And as we expect, 'amaz' and 'awesom' got the largest size in the wrodl cloud.

c) Repeat i) and ii) for the bag of negative words.

```{r}
negative_coef <- -coef.1se[which(coef.1se <0),]%>%sort(decreasing = TRUE)
negative_coef%>%head(2)
```

On average, each additional time the word horribl appears in the comment is associated with a 1.820773 decrease in the log odds of the rating and  each additional time the word unprofession appears in the comment is associated with a 1.667141 decrease increase, correspondingly

```{r}
top_100_neg<-negative_coef%>%head(100)
cor.special <- brewer.pal(8,"Dark2") 
wordcloud(names(top_100_neg),top_100_neg, 
           color=cor.special, ordered.colors=F)
```

Just like the postive word cloud, we can see the negative words that have the largest abosolute coefficients, 'unprofession' and 'horribl' are the two largest size words in this word cloud for negative words.

d) Summarize the findings. 

iii. Using majority votes find the testing errors
	i) From Lasso fit in 3)
```{r}
predict.lasso <- predict(result.lasso, as.matrix(data2.test[, c(-1)]), s="lambda.min", type = "response")
response.lasso <- rep("0", nrow(data2.test))
response.lasso[predict.lasso > .5] <- "1"


testerror.lasso <- mean(data2.test$rating != as.factor(response.lasso))
testerror.lasso    
```
	
	ii) From logistic regression in 4)
	
```{r}
beta <- rownames(as.matrix(coef.1se[which(coef.1se !=0),]))
glm.input <- as.formula(paste("rating", "~", paste(beta[-1],collapse = "+"))) 
result.glm <- glm(glm.input, family=binomial, data2.train )

# Testing errors

predict.glm <- predict(result.glm, data2.test, type = "response")
response.glm <- rep("0", nrow(data2.test))
response.glm[predict.glm > .5] <- "1"

testerror.glm <- mean(data2.test$rating != response.glm)
testerror.glm  
```
	
	iii) Which one is smaller?
	
Second one is smaller but the difference is really small.

## 3. Random Forest  

i. Briefly summarize the method of Random Forest

Random Forest uses the bagging method to aggregate the result from multiple random independent decision tree models that are built based on the bootstrapping sample of the original sample.


ii. Now train the data using the training data set by RF. Get the testing error of majority vote. Also explain how you tune the tuning parameters (`mtry` and `ntree`). 

```{r}
# fit.rf.train <- randomForest(rating~., data2.train, ntree=100)
# save(fit.rf.train, file="rf_train_100.RData")
load("rf_train_100.RData")
plot(fit.rf.train)
fit.rf.train$err.rate[50, 1]
fit.rf.train$mtry
```


## 4.  PCA first

i. Perform PCA (better to do sparse PCA) for the input matrix first. Decide how many PC's you may want to take and why.

```{r}
# pc.train <- prcomp(data2.train[, -c(1)], scale=TRUE)
# save(pc.train, file="pc_train.RData")
load("pc_train.RData")
fviz_eig(pc.train)
fviz_pca_ind(pc.train,
             col.ind = "cos2", # Color by the quality of representation
             gradient.cols = c("#00AFBB", "#E7B800", "#FC4E07"),
             repel = TRUE     # Avoid text overlapping
             )
```

```{r}
fviz_pca_var(pc.train,
             col.var = "contrib", # Color by contributions to the PC
             gradient.cols = c("#00AFBB", "#E7B800", "#FC4E07"),
             repel = TRUE     # Avoid text overlapping
             )
```

```{r}
names(pc.train) #check output 
# rotation: loadings
# x: PC scores
# sdev: standard 
pc.train.loading <- pc.train$rotation
```

```{r}
# knitr::kable(summary(pc.train)$importance)
# plot(pc.train)
# standard deviation of each principal component
std_dev <- pc.train$sdev
# variance
variance <- std_dev^2
# divide the variance by sum of total variance -> to compute the proportion of variance explained by each component
variance_prop <- variance/sum(variance)
# scree plot - the percentage of variance explained by each principal component
plot(variance_prop, xlab = "Principal Component", ylab = "Proportion of Variance Explained", type = "b", xlim=c(0, 20))

# cumulative variance plot
# ~ 30 components explains around 10% variance in the data set.
plot(cumsum(variance_prop), xlab = "Principal Component", ylab = "Cumulative Proportion of Variance Explained", type = "b", xlim=c(0, 50))
abline(h=0.10,col='red',v=30)
```
PC1 captures most variances, and there is a sharp drop of PVE between PC1 and PC2. The decreasing rate appears to smooth out from PC3 to PC10. We'll use the first 30 PCs in the following steps.

```{r}
train_pca <- data.frame(rating = data2.train$rating, pc.train$x)
# first 30 PCAs
train_pca <- train_pca[,1:30]
head(train_pca,2)
# save(train_pca,file = "pc30_train.RData")
load("pc30_train.RData")
```

ii. Pick up one of your favorite method above and build the predictive model with PC's. Say you use RandomForest.

Applying PCA before Random Forest can help reduce the number of features and get rid of collinear features.

```{r}
set.seed(1)
# model_forest <- randomForest(rating ~ ., data=train_pca, ntree = 100)
# save(model_forest,file = "rf_pc30.RData")
load("rf_pc30.RData")
# Dotchart of variable importance as measured by a Random Forest (gini index decline) 
varImpPlot(model_forest)
```
iii. What is the testing error? Is this testing error better than that obtained using the original x's? 

```{r}
#transform test into PCA
test_pca <- predict(pc.train, newdata = data2.test)
test_pca <- as.data.frame(test_pca)
# TEST SET first 30 PCAs
test_pca <- test_pca[,1:30]
#  make prediction on test data
test_pca.p <- predict(model_forest, test_pca) 

pca_test_error <- mean(test_pca.p!= data2.test$rating)
```

## 5. Ensemble model

i. Take average of some of the models built above (also try all of them) and this gives us the fifth model. Report it's testing error. (Do you have more models to be bagged, try it.)


```{r, include = FALSE}
# tree = rpart(rating ~ ., data = data2.train)
# save(tree,file='tree.RData')
load('tree.RData')
tree_test_pred = predict(tree, data2.test, type="class")
tree_test_error = mean(data2.test$rating != tree_test_pred)
```


```{r, include = FALSE}
# Logistic Model after feature selection by Lasso
formula(result.glm)
glm_test_error = testerror.glm

```



```{r, include = FALSE}
# Random Forest after applying PCA
model_forest
pca_test_error
```


```{r,include=FALSE}
# Boosting
# boost = gbm(rating ~ ., data = data2.train, distribution = "gaussian", n.trees = 50, interaction.depth = 4, shrinkage = 0.01)
# boost
# save(boost,file='boost.RData')
load('boost.RData')
tibble::as_tibble(summary(boost))

boost_test_pred <- predict(boost, data2.test, n.trees = 50)
boost_test_pred <- ifelse(boost_test_pred<0.5, 0, 1)
# boost_test_rmse = cal_rmse(boost_test_pred, data2.test$rating)
boost_test_error <- mean(boost_test_pred!= data2.test$rating)

# plot(boost_test_pred, data2.test$rating,
#      xlab = "Predicted", ylab = "Actual", 
#      main = "Predicted vs Actual: Boosted Model, Test Data",
#      col = "dodgerblue", pch = 20)
# grid()
# abline(0, 1, col = "darkorange", lwd = 2)
```


We will use the following 4 models to build our fifth model. The testing errors are shown in the following table:
```{r}
testing_error = data.frame(
  Model = c("Single Tree", "Logistic Model",  "Random Forest", "Boosting"),TestError = c(tree_test_error, glm_test_error, pca_test_error, boost_test_error))
testing_error
```

```{r}
tree_test_pred <- as.numeric(as.character(tree_test_pred))
test_pca.p <- as.numeric(as.character(test_pca.p))
ensemble_pred <- (predict.glm + tree_test_pred + test_pca.p + boost_test_pred)/4

ensemble_pred <- ifelse(ensemble_pred < 0.5, 0, 1)
ensemble_pred.error <- mean(ensemble_pred != data2.test$rating)
ensemble_pred.error
```

The testing error of the final model is reported to be 0.2538.


## 6. Final model

Which classifier(s) seem to produce the least testing error? Are you surprised? Report the final model and accompany the validation error. Once again this is THE only time you use the validation data set.  For the purpose of prediction, comment on how would you predict a rating if you are given a review (not a tm output) using our final model? 



```{r}
final_val_pred = predict(result.glm, data2.val, type = 'response')
final_val_pred <- ifelse(final_val_pred < 0.5, 0, 1)

val.error <- mean(data2.val$rating != final_val_pred)
val.error

```

The logistic classifier after a feature selection process using Lasso model seems to produce the least testing error (0.1332).

So our final model is the logistic model and the validation error is 0.11. So given a review, it should be firstly turned to document term matrix and go through the cleaning process, and then put this matrix into our final logistic model. And then the model would give the probability that the rating for the given review be 1 (stars>= 4) instead of 0. 

