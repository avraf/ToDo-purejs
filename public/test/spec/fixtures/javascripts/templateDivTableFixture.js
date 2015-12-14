function setUpHTMLFixture() {
   setFixtures('<div id="tableTaskList">'
              +'  <table>'
              +'  	<tr id="tmplRow">'
              +'  		<td class="done"><input type="checkbox"></td>'
              +'  		<td class="owner"><span></span></td>'
              +'      <td class="text"><span>Click here to insert new row...</span></td>'
							+'			<td class="createdDate"><span></span></td>'
							+'			<td class="priority">'
							+'				<select disabled>'
							+'					<option>1</option>'
							+'					<option>2</option>'
							+'					<option>3</option>'
							+'				</select>'
							+'			</td>'
							+'		</tr>'
							+'	</table>'
							+'</div>');       
}

function setUpTableForOrderingFixture() {
	setFixtures('<table>\
								<caption>Registered Tasks</caption>\
								<thead>\
									<tr>\
										<th>Done</th>\
										<th>Owner</th>\
										<th>Task</th>\
										<th>Creation Date</th>\
										<th>Priority</th>\
									</tr>\
								</thead><tbody>\
									<tr>\
										<td class="done"><input type="checkbox" checked></td>\
										<td class="owner"><span>bobby jones</span></td>\
										<td class="text"><span>Abc task</span></td>\
										<td class="createdDate"><span>Jan|01|15</span></td>\
										<td class="priority">\
											<select>\
												<option>1</option>\
												<option selected>2</option>\
												<option>3</option>\
											</select>\
										</td>\
									</tr><tr>\
										<td class="done"><input type="checkbox"></td>\
										<td class="owner"><span>none</span></td>\
										<td class="text"><span>Clean desk</span></td>\
										<td class="createdDate"><span>Dec|22|14</span></td>\
										<td class="priority">\
											<select>\
												<option>1</option>\
												<option>2</option>\
												<option>3</option>\
											</select>\
										</td>\
									</tr><tr>\
										<td class="done"><input type="checkbox"></td>\
										<td class="owner"><span>Bobby Lynn</span></td>\
										<td class="text"><span>Fix Bug</span></td>\
										<td class="createdDate"><span>Jul|12|14</span></td>\
										<td class="priority">\
											<select>\
												<option>1</option>\
												<option>2</option>\
												<option selected>3</option>\
											</select>\
										</td>\
									</tr><tr>\
										<td class="done" checked><input type="checkbox"></td>\
										<td class="owner"><span>Avraham Sayegh</span></td>\
										<td class="text"><span>Get papers filled</span></td>\
										<td class="createdDate"><span>Jan|22|15</span></td>\
										<td class="priority">\
											<select>\
												<option>1</option>\
												<option selected>2</option>\
												<option>3</option>\
											</select>\
										</td>\
									</tr><tr>\
										<td class="done"><input type="checkbox" checked></td>\
										<td class="owner"><span>Bobby Jones</span></td>\
										<td class="text"><span>Be</span></td>\
										<td class="createdDate"><span>Jan|22|15</span></td>\
										<td class="priority">\
											<select>\
												<option>1</option>\
												<option>2</option>\
												<option selected>3</option>\
											</select>\
										</td>\
									</tr><tr>\
										<td class="done"><input type="checkbox"></td>\
										<td class="owner"><span>avu</span></td>\
										<td class="text"><span>Crickes</span></td>\
										<td class="createdDate"><span>Mar|22|14</span></td>\
										<td class="priority">\
											<select>\
												<option>1</option>\
												<option>2</option>\
												<option>3</option>\
											</select>\
										</td>\
									</tr><tr>\
										<td class="done"><input type="checkbox"></td>\
										<td class="owner"><span>Avi</span></td>\
										<td class="text"><span>abc flask</span></td>\
										<td class="createdDate"><span>May|05|14</span></td>\
										<td class="priority">\
											<select>\
												<option>1</option>\
												<option selected>2</option>\
												<option>3</option>\
											</select>\
										</td>\
									</tr><tr>\
										<td class="done"><input type="checkbox" checked></td>\
										<td class="owner"><span>Avu</span></td>\
										<td class="text"><span>Old news</span></td>\
										<td class="createdDate"><span>Apr|29|14</span></td>\
										<td class="priority">\
											<select>\
												<option>1</option>\
												<option selected>2</option>\
												<option>3</option>\
											</select>\
										</td>\
									</tr><tr>\
										<td class="done"><input type="checkbox"></td>\
										<td class="owner"><span>Zack</span></td>\
										<td class="text"><span>Make none always last</span></td>\
										<td class="createdDate"><span>Jan|30|15</span></td>\
										<td class="priority">\
											<select>\
												<option>1</option>\
												<option>2</option>\
												<option selected>3</option>\
											</select>\
										</td>\
									</tr><tr id="tmplRow">\
										<td class="done"><input type="checkbox" disabled=""></td>\
										<td class="owner"><span>--</span></td>\
										<td class="text"><span>Click here to insert new row...</span></td>\
										<td class="createdDate"><span>n/a</span></td>\
										<td class="priority">\
											<select disabled="">\
												<option>1</option>\
												<option>2</option>\
												<option>3</option>\
											</select>\
										</td>\
									</tr>\
								</tbody>\
							</table>');
}
