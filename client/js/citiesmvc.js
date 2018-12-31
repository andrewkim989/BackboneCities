var CityModel = Backbone.Model.extend({
    idAttribute: "_id",
    defaults:{
        name: null,
        country: null,
        population: null
    },
});

var CityList = Backbone.Collection.extend({
    model: CityModel,
    url: "/cities",
});

var CityViewCollection = Backbone.View.extend({
    el: "#cityform",

    initialize: function(){
        this.listenTo(this.collection, "sync", this.render);
        this.listenTo(this.collection, "change", this.render);
    },
    render: function() {
        $("#allcities").empty();
        this.collection.each(function(city) {
            var cityview = new CityView({model: city});
            $("#allcities").append(cityview.render("all").$el);
        });
    },
    events: {
        "click #citysubmit": "createCity"
    },
    createCity: function(){
        $name = this.$('input[name = "name"]');
        $country = this.$('input[name = "country"]');
        $population = this.$('input[name = "population"]');
        this.collection.create({
            name: $name.val(),
            country: $country.val(),
            population: $population.val()
        });
        $name.val("");
        $country.val("");
        $population.val("");
    }
});

var CityView = Backbone.View.extend({
    tagName: "div",
    template: _.template("<p><%= name %>, <%= country %></p><p>Population: <%= population %></p>" + 
    "<button class = 'btn btn-secondary' id = 'deletecity'>Delete</button>"),
    templatetwo: _.template("<input type = 'text' name = 'name' value = '<%= name %>'><br><br>" + 
    "<input type = 'text' name = 'country' value = '<%= country %>'><br><br>" + 
    "<input type = 'number' name = 'population' value = '<%= population %>'><br><br>" + 
    "<button class = 'btn btn-success' id = 'editCity'>Save City Info</button>"),
    className: "singlecity",

    initialize: function(){
        this.listenTo(this.model, "change", this.render);
    },
    render: function(value) {
        if (value == "all") {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
        else {
            this.$el.html(this.templatetwo(this.model.toJSON()));
            return this;
        }
    },
    events: {
        "dblclick": "showCity",
        "click #editCity": "editCity",
        "click #deletecity": "removeCity"
    },
    showCity: function() {
        this.render();
    },
    editCity: function() {
        $name = this.$('input[name = "name"]');
        $country = this.$('input[name = "country"]');
        $population = this.$('input[name = "population"]');
        this.model.save({
            name: $name.val(),
            country: $country.val(),
            population: $population.val()
        });
    },
    removeCity: function() {
        this.model.destroy();
    }
})

var citieslist = new CityList();
citieslist.fetch().then(function() {
    var citycollection = new CityViewCollection({collection: citieslist});
    citycollection.render();
});