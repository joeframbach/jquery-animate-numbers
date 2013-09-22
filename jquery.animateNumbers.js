/***********
	Animates element's number to new number with commas
	Parameters:
		stop (number): number to stop on
        commas (boolean): turn commas on/off (default is true)
		duration (number): how long in ms (default is 1000)
		ease (string): type of easing (default is "swing", others are avaiable from jQuery's easing plugin
	Examples:
        $("#div").animateNumbers(1234, false, 500, "linear"); // half second linear without commas
		$("#div").animateNumbers(1234, true, 2000); // two second swing with commas
		$("#div").animateNumbers(4321); // one second swing with commas
	This fully expects an element containing an integer
	If the number is within copy then separate it with a span and target the span
	Inserts and accounts for commas during animation by default
***********/

(function($, undefined) {
    $.fn.animateNumbers = function(stop, commas, duration, ease) {
        return this.each(function() {
            var $this = $(this);
            var start = +$this.text().replace(/,/g, "");
            commas = (commas === undefined) ? true : commas;
            duration = (duration === undefined) ? 1000 : duration;
            ease = (ease === undefined) ? "swing" : ease;
            var updateText = function(text) {
                if (commas) text = text.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                this.text(text);
            };
            $({value: start}).animate({value: stop}, {
                duration: duration,
                easing: ease,
                step: updateText.call($this, Math.floor(this.value))
                complete: function() {
                    if (+$this.text() !== stop) {
                        updateText.call($this, stop);
                    }
                }
            });
        });
    };
})(jQuery);
