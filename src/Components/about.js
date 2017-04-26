// modules/about.js
import React from 'react'
import './about.css'

export default React.createClass({
  render() {
    return (
		<div id="aboutWrapper">
			<h3>About Landscaper</h3>
			<p>Your goal as a landscaper is to plant some trees and bushes on the field, in every available tile.</p>
			<p>In doing this, you must ensure the scenery is varied enough:</p>
			<ul>
				<li>No more than two consecutive trees or bushes should appear horizontally or vertically.</li>
				<li>Every row and column must have an equal number of trees and bushes.</li>
				<li>Each row must be unique. The same arrangement of trees and bushes can't appear on two rows. </li>
				<li>Each column must be unique as well</li>
			</ul>
			<p>Tips:</p>
			<ul>
				<li>Don't forget the uniqueness rule, as this is often the best hint to progress. </li>
				<li>If you see a space between two trees or two bushes, you already know what goes there. </li>
			</ul>
			<h6>Game images curtesy of clipartfest.com</h6>
		</div>
	)
  }
})