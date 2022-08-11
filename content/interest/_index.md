---
title: My Interest
description: |
  Beyond data science, I'm also a photography, fitness and movie lover.
author: "Jia Xu"
show_post_thumbnail: true
show_author_byline: true
show_post_date: true
# for listing page layout
layout: list-sidebar # list, list-sidebar, list-grid
type: blog

# for list-sidebar layout
sidebar: 
  title: My Personal Interest
  description: |
    Beyond data science, I'm also a photography, fitness and movie lover.
    
  author: "Jia Xu"
  #text_link_label: Subscribe via RSS
  #text_link_url: /index.xml
  show_sidebar_adunit: false # show ad container



# set up common front matter for all pages inside blog/
cascade:
  author: "Jia Xu"
  show_author_byline: true
  show_post_date: true
  show_disqus_comments: false # see disqusShortname in site config
  # for single-sidebar layout
  sidebar:
    text_link_label: View recent posts
    text_link_url: /blog/
    show_sidebar_adunit: false # show ad container
type: blog
cascade:
  type: blog
---

** No content below YAML for the blog _index. This file provides front matter for the listing page layout and sidebar content. It is also a branch bundle, and all settings under `cascade` provide front matter for all pages inside blog/. You may still override any of these by changing them in a page's front matter.**
