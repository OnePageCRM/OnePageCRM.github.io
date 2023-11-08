---
layout: post
title: "Design patterns in Ruby: Builder and Factory patterns"
slug: "design-patterns-in-ruby-builder-and-factory-patterns"
category: blog
post_image: /assets/images/articles/design-patterns-ruby.png
author: max
date: 2023-11-09 09:00:00
excerpt: "The Builder pattern and Factory method are powerful tools that can enhance your software design skills and help you build more efficient Ruby apps. Whether you're a beginner or an experienced Ruby developer, you'll find valuable insights and practical examples in this post that will help you implement these patterns in your projects."
graphic: /assets/images/articles/design-patterns-ruby.png
---

The Builder pattern and Factory method are powerful tools that can enhance your software design skills and help you build more efficient Ruby apps. Whether you're a beginner or an experienced Ruby developer, you'll find valuable insights and practical examples in this post that will help you implement these patterns in your projects.

Let's dive in and discover how these design patterns can elevate your Ruby programming skills.

But first, let’s go over the basics.

### What are design patterns in programming?

In software engineering, a software design pattern is like a proven solution that can be reused for common problems when creating software. It's not a ready-made code, but more like a guide on how to tackle specific issues in software design. Developers can use these patterns when building applications or systems.

These design patterns are often about how different parts of the software work together. For example, how different classes or objects interact. However, they don't specify the exact classes or objects you should use in your specific application.

Some design patterns involve changing information over time, which might not work well in certain programming languages. In some cases, if a programming language already has built-in solutions for a problem, these design patterns might not be needed. Also, keep in mind that these patterns are mainly useful in object-oriented programming and might not be the best choice for non-object-oriented languages.

### Why do developers need design patterns?

You can think of design patterns as a structured way of approaching computer programming that falls between the big ideas of how to write code and the specific step-by-step instructions for a particular task.

In simple words, design patterns are kind of recommended building blocks for your project and each of these blocks usually should solve a particular problem.

And vice versa if you have a particular problem to solve, it is a good idea to separate the functionality to a class with a responsibility described according to the appropriate design pattern.

Even if you are not 100% sure about statistical proof of whether the patterns are good, you can at least include the pattern names in your vocabulary for articulating decisions and suggestions when you are planning a project or discussing it with your colleagues.

### What design patterns should I use?

While thinking about the best way to approach a new project and its architecture, you might be asking yourself or your colleagues: “What design patterns should I use?”, “Should I use a template here?” or “What do you think about extracting this part to a Factory?”

Answers to these questions depend on what task you need to solve. This task, in turn, defines the appropriate solution and, consequently, defines the design pattern you need to choose.

In this article, we’ll dive deeper into the Builder and Factory design patterns to see which one works better for which task.

Let’s start with the Builder pattern first.

#### The Builder Design Pattern in Ruby

The Builder pattern is a creational design pattern that provides an effective solution when a system needs to create complex objects. It separates the construction of an object from its representation.

The Builder pattern allows developers to construct the steps of the creation process and create different types and representations of objects.

Here are some benefits of using the Builder pattern in Ruby:

1. **Simplified Object Creation**: If an object needs many parameters during creation, instead of using a large number of constructors (or a large parameter list), you can use the Builder pattern to construct the object step by step.

2. **Separation of Concerns**: The Builder pattern separates the construction of an object from its representation. It's easier to manage, read, and maintain the codebase.

3. **Enhanced Control**: The Builder pattern provides a finer level of control over the construction process and the final object creation.

4. **Increased Readability**: It can improve the readability of the code by naming the parameters being set, which is useful when there are a number of parameters.

Let's consider a Ruby on Rails `OrdersController` with a `create` action.

The process of creating an Order is complex because it involves creating a User, Address, and multiple OrderItem records.

Here's a possible implementation without the use of a Builder pattern:

```ruby
class OrdersController < ApplicationController
  def create
    @user = User.new(user_params)
    @address = Address.new(address_params)
    @order = Order.new(order_params)
    @order.user = @user
    @order.address = @address

    if @user.save && @address.save && @order.save
      params[:order_items].each do |item|
        @order_item = OrderItem.new(item)
        @order_item.order = @order
        @order_item.save
      end
      redirect_to @order
    else
      render :new
    end
  end

  # ...
end
```

This can get messy as complexity increases. Using a Builder pattern can help.

Let's create an `OrderBuilder`:

```ruby
class OrderBuilder
  attr_reader :order

  def initialize(user_params, address_params, order_params, order_items_params)
    @user_params = user_params
    @address_params = address_params
    @order_params = order_params
    @order_items_params = order_items_params
    @order = Order.new
  end

  def build_user
    @order.user = User.new(@user_params)
    self
  end

  def build_address
    @order.address = Address.new(@address_params)
    self
  end

  def build_order_items
    @order_items_params.each do |item|
      order_item = OrderItem.new(item)
      order_item.order = @order
      @order.order_items << order_item
    end
    self
  end

  def save
    ActiveRecord::Base.transaction do
      @order.user.save!
      @order.address.save!
      @order.save!
      @order.order_items.each(&:save!)
    end
  rescue ActiveRecord::RecordInvalid
    false
  end
end
```

Now, we can simplify the `create` action in our `OrdersController`:

```ruby
class OrdersController < ApplicationController
  def create
    builder = OrderBuilder.new(user_params, address_params, order_params, params[:order_items])
    builder.build_user.build_address.build_order_items
    if builder.save
      redirect_to builder.order
    else
      @order = builder.order
      render :new
    end
  end

  # ...
end
```

In this refactored code, the `OrderBuilder` handles all the complexity of creating an order. The `create` action in the `OrdersController` is much simpler and easier to read.
This is just an example, and the specifics can change depending on the business rules and validations of your application.

#### The benefits of the Builder Design Pattern

To shed light on the benefits of extracting building functionality from our controller and provide an example of potential added complexity, let's consider a scenario where our business requirements evolve.

Suppose the way we construct an order now depends on specific attributes of the shipping address. Perhaps we need to apply discounts to orders, and these discounts vary based on the destination country. This means we'll have to introduce additional logic into our controller action.

Now, let's imagine our next task involves checking one of the parameters to determine if a user already exists in our database. We should only create a new user when no suitable record is found. Additionally, the order might need to have different values for certain fields depending on whether a user record exists in our system.

As we proceed step by step, the controller action will start to become bloated. However, the controller itself should not “know” about this extra complexity. The primary role of a controller action is to obtain parameters from the HTTP request, potentially sanitize them, and deliver a response to the client.

The logic that unfolds between parameter retrieval and response delivery should not reside within the action. At most, some straightforward checks can be performed – for instance, if an object is successfully created, return a success response; if an error is encountered, return an error response.

The idea of relocating the object construction process from the controller to a different location likely sounds appealing. It happens that a fitting name for the class responsible for building these objects is called the Builder. This choice is both intuitive and practical, making it easy to remember and maintain within your folder structure.

Certainly, you can create an object of any class wherever you like, but organizing all the "complex object construction" tasks within an `app/bulders` directory can greatly facilitate your work and that of other developers. Notably, it can save you time.

Here's more good news: you don't need to undertake extensive controller testing with a multitude of test cases. Your focus should be on ensuring that the controller successfully acquires the parameters and forwards them to the builder. Then, based on the result returned by the builder, the controller should handle redirection or rendering. It's that straightforward.

You can now transfer all test examples that check object creation logic based on passed parameters to the builder's test file. Since the builder is a "single-task class," writing and comprehending these tests should be relatively uncomplicated.

Now, imagine a scenario where the structure of the order object becomes so intricate that you opt to transition from a single `Order` class to several child classes. This could be necessary to distinguish between orders based on delivery requirements and delivery locations. In such cases, creating classes like `class Orders::NoDeliveryOrder < Order`, `class Orders::LocalDeliveryOrder < Order` and `class Orders::AbroadlDeliveryOrder < Order` might make sense.

In your initial version of the controller, before integrating the builder, you might have implemented logic to choose between different "order classes." This approach, however, can once again add complexity to your action, and it's less conducive to utilising the builder. It might seem like you need to create three distinct builders for three different classes and eventually choose between them. While this approach can work when deciding between classes, it might not be the most efficient way to handle controller responsibilities.

#### The Factory Design Pattern in Ruby

The Factory pattern can help you clean your code.

The advantages of using this pattern are almost the same as for the Builder design pattern:

1. **Loose coupling**: The Factory pattern decouples the code that creates objects from the place where they are used. This can make the code more modular and easier to modify, extend, and test.

2. **Code reusability**: You can move the object creation code to one place, making it reusable throughout your application.

3. **Single Responsibility Principle**: Factories handle the responsibility of creating objects, leaving other parts of your code free to focus on their main responsibility.

4. **Easier Maintenance and Better Organization**: By keeping the creation logic in one place, Factories can make the code more organised and easier to maintain.

Let's consider the following `OrdesController` with `#create` action:

```ruby
class OrdersController < ApplicationController
  def create
    case params[:delivery_type]
    when 'no_delivery'
      @order = Orders::NoDeliveryOrder.new(order_params)
    when 'local_delivery'
      @order = Orders::LocalDeliveryOrder.new(order_params)
    when 'abroad_delivery'
      @order = Orders::AbroadDeliveryOrder.new(order_params)
    end

    if @order&.save
      redirect_to @order
    else
      render :new
    end
  end

  # ...
end
```

Please note that the number of classes to choose from could be greater than three of course. I used three for simplicity reasons.

Let's now refactor the code above using the Factory pattern:

```ruby
class OrderFactory
  def self.create(delivery_type, order_params)
    case delivery_type
    when 'no_delivery'
      Orders::NoDeliveryOrder.new(order_params)
    when 'local_delivery'
      Orders::LocalDeliveryOrder.new(order_params)
    when 'abroad_delivery'
      Orders::AbroadDeliveryOrder.new(order_params)
    else
      raise "Invalid delivery_type: #{delivery_type}"
    end
  end
end

class OrdersController < ApplicationController
  def create
    @order = OrderFactory.create(params[:delivery_type], order_params)

    if @order&.save
      redirect_to @order
    else
      render :new
    end
  end

  # ...
end
```

Here we find ourselves with a concise controller action that is both readable, testable, and adaptable. Additionally, we have successfully moved all the logic unrelated to the controller's primary function to our new OrderFactory class.

#### Combining the Builder and Factory Design Patterns in Ruby

When dealing with even more intricate object creation logic, you can effectively integrate both the Factory and Builder patterns.

In this approach, the data is initially passed to the Factory, where the choice is not between the final classes to instantiate but rather between the builders responsible for beginning the object's creation process.

The Factory pattern could look like this in such a case:

```ruby
class OrderFactory
  def create(params)
    builder = order_builder.new(params)
    builder.build_user.build_address.build_order_items
    builder.order
  end

  def order_builder(params)
    case params[:delivery_type]
    when 'no_delivery'
      Orders::NoDeliveryOrderBuilder.new(params)
    when 'local_delivery'
      Orders::LocalDeliveryOrderBuilder.new(params)
    when 'abroad_delivery'
      Orders::AbroadDeliveryOrderBuilder.new(params)
    else
      raise "Invalid delivery_type: #{delivery_type}"
    end
  end
end
```

We can utilize OrderFactory in our controller action with the call like next:

```ruby
class OrdersController < ApplicationController
  def create
    @order = OrderFactory.new.create(params)

    if @order&.save
      redirect_to @order
    else
      render :new
    end
  end

  # ...
end
```

The advantages remain consistent with our earlier points.

We've effectively separated three distinct functionalities across three separate classes. The Controller's sole responsibility is to manage incoming requests and provide responses.

The Factory pattern takes charge of selecting the appropriate objects to construct, with the potential for more intricate logic within, as demonstrated in our current example.

On the other hand, the Builder is adept at crafting the specific object it's assigned, even when the process is intricate. Notably, changes in one part of the logic do not ripple through to affect the other classes, and tests can be more focused on scrutinising each class's distinct responsibilities. Plus, there’s the bonus of having an organised folder structure.

### The importance of Builder and Factory design patterns in Ruby

In the long run, utilising these design patterns in Ruby will save you both time and effort.

For most businesses, the objective is to create enduring applications. However, the challenge with long-lasting applications is that the code is bound to evolve. This means that the code should be designed with a mindset of being "change-ready." This often implies adherence to established standards, readability, and a modular structure with loose coupling.

The next time you find yourself needing to create an object within your code, take a moment to reflect: Should you employ a Builder or a Factory pattern… or perhaps both?

It's a choice that can significantly streamline your software development process.
