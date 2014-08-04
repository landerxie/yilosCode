/**
 * Created by Administrator on 14-8-1.
 */
(function(){
    'use strict';
    function Deck(){

    }

    Deck.prototype = {

        cards: function(){
            return this._cards || (this._cards = []);
        },

        addCard: function (card, opt){
            opt = opt || {};
            if (opt.atTop){
                this.cards().unshift(card);
            } else{
                this.cards().push(card);
            }
        }

    }

    function exports() {
        return new Deck();
    }

    exports.Deck = Deck;
    window.deck = exports;

})();
