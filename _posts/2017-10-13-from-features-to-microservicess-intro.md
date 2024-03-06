---
redirect_from:
  - /blog/2017/10/13/from-features-to-microservices-intro/
  - /2017/10/13/from-features-to-microservices-intro/
layout: post
title: "From Features to Microservices - Intro"
slug: "from-features-to-microservices"
category: blog
author: leonard
date: 2017-10-13 09:00:00
excerpt: "The conversation about microservices has been heating up"
---

The conversation about microservices has been heating up since about 2011 (depending on who you ask). The architectural pattern it describes is, essentially, a specialisation of much older ideas about building software as a suite of independent services. Each executes within its own process and/or environment and communicates over a network via a resource API.

The engineering team at OnePageCRM have been using microservices to help address the unique challenges of scaling development and operations as the numbers of customers and services we offer have grown. 

I will try to document some of our experiences as we implement new features that build on this architectural pattern and how this approach has helped us to engineer better products and services. But before we begin, I will broadly outline what microservices are, their benefits and drawbacks and what future posts in this series might look like.

### What are microservices?

There is considerable dissensus about what the term microservices refers to. Some see it as an entirely innovative spin on distributed computing. Others see it as a specialisation of more or less traditional service oriented architectures. One way or the other, the essential idea is that applications are built as a *suite of services*.

The microservices architectural pattern is best understood by contrasting it to more monolithic patterns. A monolith, for our purposes, is an application that may be described as a 'single logical executable,' to borrow a phrase from Martin Fowler. Or simply put, it is one big app with many small responsibilities. 


<div style="text-align: center">
    <img src="/assets/images/microservices/monolithic-architecture.jpg" alt="Monolith architecture"  class="img-responsive" style="width: 50%" /><br />
</div>


### Problems with monolithic architectural patterns

To take SoundCloud as an example, the original system was delivered as a single Ruby on Rails application sitting on memcached, MySQL and a handful of other technologies. The codebase included the firm's public API, which came to be used by thousands of third-party applications, and the user facing web application itself. 

As the business grew, its’ engineers found it increasingly difficult to develop, maintain and innovate their orders of magnitude more customers using a rapidly evolving suite of services. Coupling points had evolved over time between and among application modules, services and data storage. New features of SoundCloud could not be developed in isolation. Pushing a change to one module meant a new deployment of unrelated modules.

This meant that even relatively small changes placed the entire service at risk. Module boundaries had become increasingly permeable. Build and deployment activities had become more and more expensive and time-consuming. 
While the codebase had become so unwieldy that no individual Soundcloud team member knew the full extent of it, making the team increasingly less agile. Even working with standard IDEs had become more challenging because of the sheer size of the codebase.

### Benefits of a microservice architectural pattern

The microservice architectural pattern is one answer to the problem of complexity at scale, adopted by the engineers at many of the biggest firms in the industry, and increasingly by the engineering team at OnePageCRM. In essence, the approach boils down to replacing a single, monolithic application with an application implemented by a collection of independent services specialised to fulfill one or few responsibilities. Microservices architectures can be characterised roughly in terms of six related themes:

1. Application architecture is **decentralised**. Data management is decentralised; data itself is distributed across services, databases and schemas, aligning data management and views of the data with the domains the data belongs to.  Teams are decentralised, with better defined, well bounded responsibilities and less rigid governance structures;  team based or project based standards (internal open source) are relatively common. 
2. Each component or service of a system is **independent**. Components and services can be changed, deployed, replaced, scaled and so on in relative isolation, that is without affecting other unrelated components and services. Loose coupling!!! 
3. To each microservice component belongs a **single responsibility**. Each does one thing, and one thing well. Greater modularity and looser coupling, reduced complexity and therefore cognitive load, benefitting design, implementation, debugging, scaling and maintainenance activities.
4. Each microservice component is a **black box** to every other component and communication between services occurs via APIs over a network, thus avoiding implicit or hidden dependencies.         
    <div style="text-align: center">
        <img src="/assets/images/microservices/microservices-architecture.jpg" alt="This image was borrowed from " class="img-responsive" style="width: 50%" /><br />
    </div>
5. Responsibility for a microservice throughout its lifecycle belongs to the team that build it, otherwise known (very roughly) as **DevOps**. There is an organisational symmetry here too, a la Conway's Law. Microservice oriented applications tend to be delivered by small agile teams who take ownership of the application across the entire development lifecycle which brings them closer to the coalface of business, user and system. You build it; you run it.
6. Microservices architectures tend to be **tool agnostic** or 'polyglot': operating systems, languages, frameworks, data stores and so on, are chosen to best reflect the demands of the solution domain rather than reflecting the existing codebase, infrastructure or preferences. Hammers to nails. 

### Challenges of migrating from monolith to microservices

Migrating a legacy application from a monolithic architecture to a microservices architecture is a non-trivial proposition. Microservices approaches are not a one-size-fits-all solution; there are challenges and trade-offs. 

* Arguably, a microservices approach to application development replaces a complex monolith with a complex suite of services. Although it mitigates some of the same problems. For example, the loss of a single independent service is more often than not preferable to the failure of the system as a whole. 
* Depending on the implementation of an existing monolithic application, refactoring as separate services may be a complex and time-consuming activity involving analysis, extraction, and refactoring right down to the database layer.
* Microservices architectures may not work well with existing organisational principles and practices. They all but require agile teams with high levels of independence and considerable expertise. 
* Versioning microservices is often very challenging. In a monolithic system, versioning is simple. The version of the system just is the version of the monolith repository. In microservices systems, the version of the system depends on multiple repositories in various conditions. 

### From features to microservices

What does it mean in practical terms? How are microservices designed, built, deployed, tested and maintained? How do we develop application features in this way?

Increasingly, companies like Netflix, SoundCloud and others are documenting and otherwise sharing experiences and best practices. Cloud providers like AWS and Google provide platforms, tools and services that give a recognisable shape to the theory and practice of microservice oriented software development. Well written libraries and serverless frameworks are providing more intuitive abstractions over the messy details of the offerings of one or another infrastructure service provider. The open source community also provides tooling and expertise that puts the answers to the challenging questions that define the domain within reach.

In the next installment of this series of posts I will begin sharing with you some of the highlights of the development lifecycle of a new feature we are developing at OnePageCRM.





