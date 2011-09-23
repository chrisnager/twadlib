/*
 * The MIT License (MIT)
 * Copyright (c) 2011 Christopher Nager
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

var regexs=[/NAME/g,/PLURAL_NOUN/g,/NOUN/g,/ADJECTIVE/g,/PRESENT_VERB/g];
var stories=[ "<h1>AUTHOR_NAME says:</h1><p>I sure am tired of these ADJECTIVE PLURAL_NOUN on this ADJECTIVE NOUN.</p>",
"<h1>AUTHOR_NAME says:</h1><p>If it was ADJECTIVE to PRESENT_VERB NOUN, everyone would do it.</p>",
"<h1>AUTHOR_NAME says:</h1><p>Hold on to your PLURAL_NOUN.</p>",
"<h1>AUTHOR_NAME says:</h1><p>Life is a NOUN, PRESENT_VERB it.</p>",
"<h1>AUTHOR_NAME says:</h1><p>It's not the PLURAL_NOUN that scare me, it's the NOUN!</p>",
"<h1>AUTHOR_NAME says:</h1><p>NAME is a(n) ADJECTIVE NOUN.</p>",
"<h1>AUTHOR_NAME says:</h1><p>Why can't we all just PRESENT_VERB?</p>",
"<h1>AUTHOR_NAME says:</h1><p>Is it just me, or is NAME acting rather ADJECTIVE?</p>",
"<h1>AUTHOR_NAME says:</h1><p>Say hello to my ADJECTIVE NOUN.</p>",
"<h1>AUTHOR_NAME says:</h1><p>I PRESENT_VERB all day with ADJECTIVE PLURAL_NOUN.</p>",
"<h1>AUTHOR_NAME says:</h1><p>I just can't get enough of your NOUN!</p>",
"<h1>AUTHOR_NAME says:</h1><p>Never gonna PRESENT_VERB NAME up, Never gonna let NAME down</p>"]
var num=21;
$.ajax({
  url : 'http://search.twitter.com/search.json?q=%40twadlib&result_type=recent&rpp='+num+'&show_user=true&callback=?',
  dataType : 'json',
  timeout : 5000,
  success : function(o) {
    for (i=0; i < o.results.length && i < num; i++) {
      var values=o.results[i].text.replace(/ http:\/\/.*$/, '').split(' #');
      if (values.length > 5) {
        if ( i > 0 ) { $('.previous').append('<article id="story-'+i+'" class="ad-lib"></article>'); }
        var story=stories[Math.floor(Math.random()*stories.length)].replace('AUTHOR_NAME', '<a href="http://twitter.com/'+o.results[i].from_user+'">'+o.results[i].from_user+'</a>');
        for (j=0; j<regexs.length && j<values.length; j++) { story=story.replace(regexs[j], values[j+1]); }
        $('#story-'+i).html(story);
      }
    }
  },
  //  error : function() { alert('Fail Whale!'); },
});
$(function() { $('#logo').click(function() { location.reload(); }); });
