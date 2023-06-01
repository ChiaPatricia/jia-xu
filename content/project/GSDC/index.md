---
title: "Uncovering Inequities in Green Space (Green Space Data Challenge)"
subtitle: "Modeling an Environmental-Social Green Space Index to Improve Community Health and Equity"
excerpt: "With the rapid growth of urbanization, green spaces in the form of parks, gardens, and other open areas are extremely important for improving the quality of life for those who live in urban areas. As polluted air and water and overcrowded cities become our everyday lives, the physical and mental health of urban communities has undoubtedly gained increasing attention in recent years. Not surprisingly, green spaces are coming to the rescue. Cancel changes Open spaces such as parks benefit communities by providing a cleaner environment to protect public health such as a reducing in the urban heat island effect and improving air quality. They can also have an impact on social health by contributing to increase community cohesion and wellbeing, and increased property values, among other positive environmental, social, and financial outcomes. As a result, the supply of green space and the ease with which it can be accessed are key concerns in urban planning and policy-making."
date: 2023-03-23
author: "Jia Xu"
draft: false
tags:
  - datathon
categories:
  - Python
  - ArcGIS
layout: single
links:
- icon: door-open
  icon_pack: fas
  name: website
  url: https://mdi.georgetown.edu/pbi/the-green-space-data-challenge/?utm_source=GU+MDI&utm_medium=Email&utm_campaign=GSDC+Winner+Blast

---



[The Green Space Data Challenge](https://mdi.georgetown.edu/pbi/greenspace/) hosted by the Place-Based Indicators Project at The Massive Data Institute, is an opportunity for students and early career professionals to turn green space data into indicators that could help local leaders understand and improve their communities. And I am thrilled to be awarded the [first place winner](https://mdi.georgetown.edu/pbi/the-green-space-data-challenge/?utm_source=GU+MDI&utm_medium=Email&utm_campaign=GSDC+Winner+Blast) in Community Health and Student Prize.


[Storymap Visualization](https://storymaps.arcgis.com/stories/1cc16b53f3d94cedaa68acfad44571c9)
---

$\textbf{Introduction}$

With the rapid growth of urbanization, green spaces in the form of parks, gardens, and other open areas are extremely important for improving the quality of life for those who live in urban areas. As polluted air and water and overcrowded cities become our everyday lives, the physical and mental health of urban communities has undoubtedly gained increasing attention in recent years. Not surprisingly, green spaces are coming to the rescue.

Open spaces such as parks benefit communities by providing a cleaner environment to protect public health such as a reducing in the urban heat island effect and improving air quality. They can also have an impact on social health by contributing to increase community cohesion and wellbeing, and increased property values, among other positive environmental, social, and financial outcomes. As a result, the supply of green space and the ease with which it can be accessed are key concerns in urban planning and policy-making.  

Traditionally, their impact on communities has been measured by the greenery they provide. However, their contributions to community fitness and wellness should also be recognized, which motivates us to create an integrated index to paint a picture of green spaces in the U.S. To illustrate the impact of green spaces on community health, we designed the Environmental-Social Green Space (ESGS), an actionable community indicator  derived from fitness, greenery and wellness.  

While it is not always equitable to access green spaces within cities, it is important to recognize this issue of environment justice and to raise public  awareness of the benefitsofgreen spaces for public health.


$\textbf{Project Objective}$

To reflect the influence of green space on community health, our project has the following two levels of objectives:

The first step is to model the Environmental-Social Green Space (ESGS) Index for each county in the U.S. as a cross-group demonstration and measurement.

The second step is to examine the relationship between ESGS and specific demographic groups so as to provide key insights and recommendations to improve environmental and social justice for disadvantaged groups.

$\textbf{Data Overview}$

Our dataset consists of 4 raw datasets derived from Green Space Challenge data packages on recidivism, including PAD-US-AR, County Health Rankings, FEMA: National Risk Index, and EnviroAtlas: Green space by census block. 

PAD-US-AR: The dataset contains information on protected areas in the United States. 
County Health Rankings: This dataset contains health indicators for different counties in the United States

FEMA: National Risk Index: The National Risk Index is a dataset and online tool to help illustrate the U.S. communities most at risk for 18 natural hazards. It was designed and built by FEMA in close collaboration with various stakeholders and partners in academia; local, state, and federal government; and private industry. 

EnviroAtlas: This dataset contains information on green spaces in the United States
Among those datasets, we identify 12 target features that are relevant to our research questions. To link the data from these sources, we merged using the county's Federal Information Processing Standard (FIPS) code as the key.

Access to exercise opportunities, Life Expectancy, Smoking, Excessive Drinking, Obesity, and Uninsured individuals were features extracted from the County Health Rankings dataset. Natural Hazard risk was obtained from the FEMA: National Risk Index dataset, while Imperious surface data was derived from the EnviroAtlas: Green space by census block dataset. The features NDVI summertime max, Tree canopy cover, and Public park cover were derived from the PAD-US-AR dataset.

To compute the Accessible parks feature, we first calculated the square mileage of each county and then took the logarithm and factored it by 10 so as to generate a certain quantity of random points in each county proportionally. Then we use spatial join and buffer tools to calculate the total 1000m available parks of all the points in each county.
