define([
    'backbone',
    'configs/urls.config',
    'locales/translit.locale'
], function( Backbone, urlsConfig, translitLocale ) {
    return Backbone.View.extend({
        el: '.search_form',

        events: {
            'click .search_form__clear_input_icon': 'onClearInputClick',
            'blur .search_form__search_input': 'onInputBlur',
            'focus .search_form__search_input': 'onInputFocus',
            'keydown .search_form__search_input': 'onInputKeydown'
        },

        initialize: function() {
            _.bindAll( this, 'onInputKeydown', '_onFetchDone', '_onSuggestSuccess', 'onClearInputClick' );

            return this;
        },

        render: function() {
            this.$searchInput = this.$('.search_form__search_input');
            this.$clearInputBtn = this.$('.search_form__clear_input_icon');
            this.$suggestionList = this.$('.search_form__suggestion_list');

            return this;
        },

        onInputBlur: function() {
            this.$suggestionList.hide();
        },

        onInputFocus: function() {
            this.$suggestionList.show();
        },

        onInputKeydown: _.debounce(function( e ) {
            var name = $( e.currentTarget ).val().trim();

            this.$clearInputBtn.toggleClass( 'invisible', !name );

            if ( /[a-zA-Z]/.test( name ) )  {
                name = this._getStringTranslit( name );
            }

            $.when( this._fetchSuggestions( name ) )
                .done( this._onFetchDone );

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