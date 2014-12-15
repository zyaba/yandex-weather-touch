define([
    'backbone',
    'globals/main.global',
    'configs/urls.config',
    'locales/translit.locale'
], function( Backbone, Global, urlsConfig, translitLocale ) {
    return Backbone.View.extend({
        el: '.search_form',

        events: {
            'click .search_form__clear_input_icon': 'onClearInputClick',
            'click .suggestion_list__item': 'onCityClick',
            'submit': 'onFormSubmit',
            'focus .search_form__search_input': 'onInputFocus',
            'keydown .search_form__search_input': 'onInputKeydown'
        },

        initialize: function() {
            var methodsToBind = [
                '_onFetchDone',
                '_onSuggestSuccess',
                'onClearInputClick',
                'onInputKeydown',
                'onCityClick',
                'onBodyClick',
                'onFormSubmit'
            ];

            _.bindAll( this, methodsToBind );

            this.suggestions = [];

            return this;
        },

        render: function() {
            this.$searchInput = this.$('.search_form__search_input');
            this.$clearInputBtn = this.$('.search_form__clear_input_icon');
            this.$suggestionList = this.$('.search_form__suggestion_list');

            $('body' ).on('click', this.onBodyClick );

            return this;
        },

        onCityClick: function( e ) {
            e.stopPropagation();

            var $el = $( e.currentTarget ),
                cityName = $el.text(),
                cityGeoId = $el.data('geoid' ).toString();

            this.$searchInput.val( cityName );
            this.$suggestionList.hide();

            Global.router.navigate( cityGeoId, { trigger: true } );
        },

        onBodyClick: function( e ) {
            if ( this.$suggestionList.is(':visible' ) ) {
                this.$suggestionList.hide();
            }
        },

        onInputFocus: function() {
            if ( this.suggestions.length ) {
                this.$suggestionList.show();
            }
        },

        onFormSubmit: function( e ) {
            e.preventDefault();

            var name = this.$searchInput.val().trim();

            this.$clearInputBtn.toggleClass( 'invisible', !name );

            if ( /[a-zA-Z]/.test( name ) )  {
                name = this._getStringTranslit( name );
            }

            $.when( this._fetchSuggestions( name ) )
                .done( this._onFetchDone );
        },

        onInputKeydown: _.debounce(function() {
            this.$el.submit();
        }, 100 ),

        onClearInputClick: function( e ) {
            this.$searchInput.val('');
            this.$suggestionList.empty();
            this.$clearInputBtn.addClass('invisible');
        },

        _fetchSuggestions: function( name ) {
            return $.ajax({
                url: urlsConfig.suggest.replace( '{query}', name ),
                success: this._onSuggestSuccess
            })
        },

        _onSuggestSuccess: function( data ) {
            console.log( data );
            this.suggestions = data;
        },

        _onFetchDone: function() {
            this.$suggestionList.empty();
            this._renderRows();
        },

        _renderRows: function() {
            if ( !this.suggestions.length ) {
                return false;
            }

            var fragment = document.createDocumentFragment(),
                row;

            _.each( this.suggestions, function( sug ) {
                row = this._renderSingleRow( sug );
                fragment.appendChild( row );
            }.bind( this ) );

            this.$suggestionList.append( fragment );
            this.$suggestionList.show();
        },

        _renderSingleRow: function( suggest ) {
            return $('<li/>', {
                'class': 'suggestion_list__item',
                'data-geoid': suggest.geoid
            } ).text( suggest.name )[0];
        },

        _getStringTranslit: function( str ) {
            var newString = '',
                i = 0;

            for (;i < str.length; i++ ) {
                newString += translitLocale[ str[i] ] || str[i];
            }

            return newString;
        }
    });
});