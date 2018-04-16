'use strict';
const { generateName }  = require('./utils/generate-name'),
  { generateCode }      = require('./utils/generate-code'),
  { generateEmail }     = require('./utils/generate-email');

// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

class ratePlan {
  constructor() {
    this.code = Math.floor(Math.random()*1000);
  }
}

class roomType {
  constructor() {
    this.code = Math.floor(Math.random()*1000);
  }
}

// This class implements the RandomDie GraphQL type
class Hotel {
  constructor() {
    this.id = generateCode();
    this.code = "" + generateCode();
    this.name = generateName();
    this.emails = generateEmail();
    this.languagePreference = generateName();
    this.ratePlans = [new ratePlan()];
    this.roomTypes = [new roomType()];

    this.channelManagerHotelId = "" + generateCode();
    this.channelManagerPmsHotelId = "" + generateCode();
    this.leonardoHotelCode = this.code;
    this.hotelEmail = generateEmail();
    this.taxPercentage = "" + generateCode();
    this.roomRates = [];
  }
}

// This class implements the RandomDie GraphQL type
class Pms {
  constructor(hotel_num) {
    this.code = "" + generateCode()
    this.username = generateName()
    this.hotelLevelAuthentication = Math.random() > 0.5 ? true : false
    this.hotelList = Array.from(Array(hotel_num).keys()).map(() => (new Hotel()))
  }
  hotel({code = null}) {
    if(code) {
      var hotel = null
      hotel = this.hotelList.filter(function(hotel_to_check) {
        if(hotel_to_check.code === code) {
          return true
        }
        else {
          return false
        }
      });
      if(hotel && hotel.length) {
        return hotel[0]
      }
    }

    return null;
  }
  hotels() {
    return this.hotelList
  }
}

var hotelsList = Array.from(Array(10000).keys()).map(() => (new Hotel())),
  pmsesList = Array.from(Array(10000).keys()).map(() => (new Pms(100)))

// The root provides the top-level API endpoints
const rootValue = {
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  },
  hotel: function() {
    return new Hotel();
  },
  hotels: function({filter = null, page = 0, size = 10}) {
    var output = hotelsList,
    pagination = {};

    if(filter && filter.code) {
      output = output.filter(function(hotel) {
        return hotel.code && (new RegExp(filter.code)).test(hotel.code);
      });
    }

    pagination.page   = page;
    pagination.pages  = Math.ceil(output.length / size);
    pagination.size   = size;
    pagination.total  = output.length;

    output = output.slice(page * size, (page + 1) * size);

    return {items: output, pagination};
  },
  pmses: function({filter = null, page = 0, size = 10}) {
    console.log('ok')
    var output = pmsesList,
    pagination = {};

    if(filter && filter.code) {
      output = output.filter(function(pms) {
        return pms.code && (new RegExp(filter.code)).test(pms.code);
      });
    }

    pagination.page   = page;
    pagination.pages  = Math.ceil(output.length / size);
    pagination.size   = size;
    pagination.total  = output.length;

    output = output.slice(page * size, (page + 1) * size);

    return {items: output, pagination};
  }
}

exports.rootValue = rootValue;
