---
title: Accessibility
order: 3
---

# Accessibility

There are plenty of information on the internet about what accessibility is and why it is important.

## Benefits of having an accessible design system 

Having accessible "building blocks" of your product means you get a good foundation to work with, this makes developing an accessible website or application easier and more achievable than building from scratch or an non-accessible DS.

::: info
Although it does not guarantee an accessible website overall, it helps prevent many common accessibility issues and reduces the engineering (and emotional) effort to maintain an accessible product.
:::

## How do we approach accessibility

Go UI's approach to testing accessibility has 2 steps:

1. Automated testing - Our end to end testing loads demo pages into a headless chrome browser, and run [axe accessibility checker](https://www.deque.com/axe/) script against the loaded page. 
2. Human review - Through building our patterns and internal applications, we manually review the site with NVDA screen reader and Chrome dev tools to see if the end result pages make sense and are easy to use.


## What does AI tell us

ChatGPT gave a good answer to "write an article about the importance of accessibility in design systems":

![ChatGPT's article about design system, quoted below](/assets/img/docs/a11y-chatgpt.png)

> Design systems are an important tool for ensuring consistency and cohesion in the design of digital products, such as websites and applications. A design system is a collection of standardized components and guidelines that help designers and developers create user interfaces that are intuitive, easy to use, and aesthetically pleasing.
> 
> However, it is important for design systems to also prioritize accessibility. This means ensuring that the products designed using the system can be used by people with disabilities, such as those who are blind or have low vision, hearing impairments, or mobility impairments.
> 
> Accessibility is not just a moral obligation, but also a legal requirement in many countries. For example, the Americans with Disabilities Act (ADA) requires that all public accommodations, including websites and applications, be accessible to individuals with disabilities.
> 
> In addition to meeting legal requirements, making design systems accessible has many benefits. For one, it can help increase the reach of a product, as it allows more people to use it. This can be particularly important for businesses, as it can help them tap into a larger market and potentially increase revenue.
> 
> Accessibility can also improve the user experience for everyone, not just those with disabilities. For example, providing text alternatives for images and using clear and simple language can benefit users who may not have a strong command of the language used in the product, or who may have cognitive or learning disabilities.
> 
> Furthermore, designing with accessibility in mind can help create more inclusive and diverse products. This can foster a sense of belonging and inclusivity among users, and can also help organizations attract and retain a diverse workforce.
> 
> In conclusion, accessibility is an essential aspect of design systems. By prioritizing accessibility, design systems can help create products that are usable by a wider range of people, meet legal requirements, improve the user experience, and foster inclusivity and diversity.
> 
> -- *A ChatGPT's answer to "write an article about the importance of accessibility in design systems"*