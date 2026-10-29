// Batch 6: ~100 more quizzes + removal of near-duplicates.
// ---- remove near-duplicates (year versions / supersets stay) ----
['teams60','mvp','fmvp','dpoy','6moy','scoring','asg-mvp','21k'].forEach(id=>{ const i=QUIZZES.findIndex(q=>q.id===id); if(i>-1) QUIZZES.splice(i,1); });

const Q6=[
// ---- awards by year ----
{id:'asg-mvp-year',layout:'clued',cat:'Awards',title:'All-Star Game MVPs by Year',t:600,desc:'Can you name the NBA All-Star Game MVP for each year (1980–2025)?',items:L(`1980 | George Gervin / Gervin / Iceman
1981 | Nate Archibald / Tiny Archibald / Archibald
1982 | Larry Bird / Bird
1983 | Julius Erving / Erving / Dr J / Dr. J
1984 | Isiah Thomas / Isiah / Thomas
1985 | Ralph Sampson / Sampson
1986 | Isiah Thomas / Isiah / Thomas
1987 | Tom Chambers / Chambers
1988 | Michael Jordan / Jordan / MJ
1989 | Karl Malone / K Malone / Mailman / Malone
1990 | Magic Johnson / Magic / Earvin Johnson
1991 | Charles Barkley / Barkley
1992 | Magic Johnson / Magic / Earvin Johnson
1993 | John Stockton / Stockton / Karl Malone / Malone
1994 | Scottie Pippen / Pippen
1995 | Mitch Richmond / Richmond
1996 | Michael Jordan / Jordan / MJ
1997 | Glen Rice / Rice
1998 | Michael Jordan / Jordan / MJ
2000 | Shaquille O'Neal / Shaq / O'Neal / Oneal / Tim Duncan / Duncan
2001 | Allen Iverson / Iverson / AI
2002 | Kobe Bryant / Kobe / Bryant
2003 | Kevin Garnett / Garnett / KG
2004 | Shaquille O'Neal / Shaq / O'Neal / Oneal
2005 | Allen Iverson / Iverson / AI
2006 | LeBron James / LeBron / James
2007 | Kobe Bryant / Kobe / Bryant
2008 | LeBron James / LeBron / James
2009 | Kobe Bryant / Kobe / Bryant / Shaquille O'Neal / Shaq
2010 | Dwyane Wade / Wade
2011 | Kobe Bryant / Kobe / Bryant
2012 | Kevin Durant / Durant / KD
2013 | Chris Paul / CP3 / Paul
2014 | Kyrie Irving / Kyrie / Irving
2015 | Russell Westbrook / Westbrook / Russ
2016 | Russell Westbrook / Westbrook / Russ
2017 | Anthony Davis / AD / Davis
2018 | LeBron James / LeBron / James
2019 | Kevin Durant / Durant / KD
2020 | Kawhi Leonard / Kawhi / Leonard
2021 | Giannis Antetokounmpo / Giannis / Antetokounmpo
2022 | Stephen Curry / Steph Curry / Curry / Steph
2023 | Jayson Tatum / Tatum
2024 | Damian Lillard / Lillard / Dame
2025 | Stephen Curry / Steph Curry / Curry / Steph`)},
{id:'6moy-year',layout:'clued',cat:'Awards',title:'Sixth Men of the Year by Year',t:600,desc:'Can you name the NBA Sixth Man of the Year for each season (1983–2025)?',items:L(`1983 | Bobby Jones / Jones
1984 | Kevin McHale / McHale
1985 | Kevin McHale / McHale
1986 | Bill Walton / Walton
1987 | Ricky Pierce / Pierce
1988 | Roy Tarpley / Tarpley
1989 | Eddie Johnson / Johnson
1990 | Ricky Pierce / Pierce
1991 | Detlef Schrempf / Schrempf
1992 | Detlef Schrempf / Schrempf
1993 | Clifford Robinson / Cliff Robinson / Robinson
1994 | Dell Curry / D Curry / Curry
1995 | Anthony Mason / Mason
1996 | Toni Kukoc / Kukoc / Kukoč
1997 | John Starks / Starks
1998 | Danny Manning / Manning
1999 | Darrell Armstrong / Armstrong
2000 | Rodney Rogers / Rogers
2001 | Aaron McKie / McKie
2002 | Corliss Williamson / Williamson
2003 | Bobby Jackson / Jackson
2004 | Antawn Jamison / Jamison
2005 | Ben Gordon / Gordon
2006 | Mike Miller / Miller
2007 | Leandro Barbosa / Barbosa
2008 | Manu Ginobili / Ginobili / Manu / Ginóbili
2009 | Jason Terry / Terry / Jet
2010 | Jamal Crawford / Crawford
2011 | Lamar Odom / Odom
2012 | James Harden / Harden
2013 | J.R. Smith / JR Smith / Smith
2014 | Jamal Crawford / Crawford
2015 | Lou Williams / Lou Will / Williams
2016 | Jamal Crawford / Crawford
2017 | Eric Gordon / Gordon
2018 | Lou Williams / Lou Will / Williams
2019 | Lou Williams / Lou Will / Williams
2020 | Montrezl Harrell / Harrell / Trez
2021 | Jordan Clarkson / Clarkson
2022 | Tyler Herro / Herro
2023 | Malcolm Brogdon / Brogdon
2024 | Naz Reid / Reid
2025 | Payton Pritchard / Pritchard`)},
{id:'dpoy-year',layout:'clued',cat:'Awards',title:'Defensive Players of the Year by Year',t:600,desc:'Can you name the NBA Defensive Player of the Year for each season (1983–2025)?',items:L(`1983 | Sidney Moncrief / Moncrief
1984 | Sidney Moncrief / Moncrief
1985 | Mark Eaton / Eaton
1986 | Alvin Robertson / Robertson
1987 | Michael Cooper / Cooper
1988 | Michael Jordan / Jordan / MJ
1989 | Mark Eaton / Eaton
1990 | Dennis Rodman / Rodman / Worm
1991 | Dennis Rodman / Rodman / Worm
1992 | David Robinson / Robinson / Admiral
1993 | Hakeem Olajuwon / Olajuwon / Hakeem
1994 | Hakeem Olajuwon / Olajuwon / Hakeem
1995 | Dikembe Mutombo / Mutombo / Dikembe
1996 | Gary Payton / Payton / Glove
1997 | Dikembe Mutombo / Mutombo / Dikembe
1998 | Dikembe Mutombo / Mutombo / Dikembe
1999 | Alonzo Mourning / Mourning / Zo
2000 | Alonzo Mourning / Mourning / Zo
2001 | Dikembe Mutombo / Mutombo / Dikembe
2002 | Ben Wallace / Wallace / Big Ben
2003 | Ben Wallace / Wallace / Big Ben
2004 | Ron Artest / Metta World Peace / Artest / World Peace / Metta
2005 | Ben Wallace / Wallace / Big Ben
2006 | Ben Wallace / Wallace / Big Ben
2007 | Marcus Camby / Camby
2008 | Kevin Garnett / Garnett / KG
2009 | Dwight Howard / Dwight / Howard
2010 | Dwight Howard / Dwight / Howard
2011 | Dwight Howard / Dwight / Howard
2012 | Tyson Chandler / Chandler
2013 | Marc Gasol / Gasol
2014 | Joakim Noah / Noah
2015 | Kawhi Leonard / Kawhi / Leonard
2016 | Kawhi Leonard / Kawhi / Leonard
2017 | Draymond Green / Draymond / Green
2018 | Rudy Gobert / Gobert
2019 | Rudy Gobert / Gobert
2020 | Giannis Antetokounmpo / Giannis / Antetokounmpo
2021 | Rudy Gobert / Gobert
2022 | Marcus Smart / Smart
2023 | Jaren Jackson Jr. / Jaren Jackson / JJJ / Jackson
2024 | Rudy Gobert / Gobert
2025 | Evan Mobley / Mobley`)},
{id:'allnba-2024',layout:'table',cat:'Tables',title:'2023–24 All-NBA Teams',t:240,desc:'Can you name the 15 players on the 2023–24 All-NBA First, Second and Third Teams?',cols:['','','','',''],rows:[
 ['1st Team','Giannis Antetokounmpo / Giannis / Antetokounmpo','Luka Doncic / Luka / Doncic / Dončić','Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai','Nikola Jokic / Jokic / Jokić / Joker','Jayson Tatum / Tatum'],
 ['2nd Team','Jalen Brunson / Brunson','Anthony Edwards / Ant / Edwards','Kevin Durant / Durant / KD','Anthony Davis / AD / Davis','Jaylen Brown / Brown'],
 ['3rd Team','LeBron James / LeBron / James','Stephen Curry / Steph Curry / Curry / Steph','Devin Booker / Booker / Book','Tyrese Haliburton / Haliburton / Hali','Domantas Sabonis / Sabonis']]},
{id:'allnba-2023',layout:'table',cat:'Tables',title:'2022–23 All-NBA Teams',t:240,desc:'Can you name the 15 players on the 2022–23 All-NBA First, Second and Third Teams?',cols:['','','','',''],rows:[
 ['1st Team','Giannis Antetokounmpo / Giannis / Antetokounmpo','Joel Embiid / Embiid','Luka Doncic / Luka / Doncic / Dončić','Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai','Jayson Tatum / Tatum'],
 ['2nd Team','Nikola Jokic / Jokic / Jokić / Joker','Jimmy Butler / Butler','Donovan Mitchell / Mitchell / Spida','Stephen Curry / Steph Curry / Curry / Steph','Jaylen Brown / Brown'],
 ['3rd Team','LeBron James / LeBron / James','Damian Lillard / Lillard / Dame','DeMar DeRozan / DeRozan','Julius Randle / Randle','Domantas Sabonis / Sabonis']]},
// ---- clubs & feats ----
{id:'50-40-90',layout:'list',cat:'Records',title:'50-40-90 Club',t:120,desc:'Can you name every player who has shot 50% from the field, 40% from three and 90% from the line in a season?',items:L(`Larry Bird / Bird
Mark Price / Price
Reggie Miller / Reggie / Miller
Steve Nash / Nash
Dirk Nowitzki / Dirk / Nowitzki
Kevin Durant / Durant / KD
Stephen Curry / Steph Curry / Curry / Steph
Malcolm Brogdon / Brogdon
Kyrie Irving / Kyrie / Irving`)},
{id:'mvp-dpoy',layout:'list',cat:'Awards',title:'MVP and DPOY in the Same Season',t:45,desc:'Can you name the three players who won MVP and Defensive Player of the Year in the same season?',items:L(`Michael Jordan / Jordan / MJ
Hakeem Olajuwon / Olajuwon / Hakeem
Giannis Antetokounmpo / Giannis / Antetokounmpo`)},
{id:'scoring-title-ring',layout:'list',cat:'Records',title:'Scoring Title + Championship, Same Season',t:60,desc:'Can you name every player who led the league in scoring and won the title in the same season?',items:L(`Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor
Michael Jordan / Jordan / MJ
Shaquille O'Neal / Shaq / O'Neal / Oneal
Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai`)},
{id:'never-finals',layout:'list',cat:'Teams',title:'Teams That Have Never Reached the Finals',t:60,desc:'Can you name the five current franchises that have never played in the NBA Finals?',items:L(`Los Angeles Clippers / Clippers
Memphis Grizzlies / Grizzlies
Charlotte Hornets / Hornets
New Orleans Pelicans / Pelicans
Minnesota Timberwolves / Timberwolves / Wolves`)},
{id:'aba-teams',layout:'list',cat:'Teams',title:'ABA Teams That Joined the NBA',t:45,desc:'Can you name the four ABA franchises that joined the NBA in the 1976 merger?',items:L(`Denver Nuggets / Nuggets
Indiana Pacers / Pacers
San Antonio Spurs / Spurs
New York Nets / Nets / Brooklyn Nets / New Jersey Nets`)},
{id:'baa-1946',layout:'list',cat:'Teams',title:'Original 1946–47 BAA Teams',t:180,desc:'Can you name the 11 teams that played the first BAA (now NBA) season in 1946–47?',items:L(`Boston Celtics / Celtics
New York Knicks / Knicks
Philadelphia Warriors / Warriors
Providence Steamrollers / Steamrollers
Toronto Huskies / Huskies
Washington Capitols / Capitols
Chicago Stags / Stags
Cleveland Rebels / Rebels
Detroit Falcons / Falcons
Pittsburgh Ironmen / Ironmen
St. Louis Bombers / St Louis Bombers / Bombers`)},
// ---- Finals opponents ----
{id:'jordan-finals',layout:'clued',cat:'Champions',title:"Jordan's Finals Opponents",t:90,desc:'Can you name the team the Bulls beat in each of Michael Jordan\'s six Finals?',items:L(`1991 | Los Angeles Lakers / Lakers
1992 | Portland Trail Blazers / Trail Blazers / Blazers
1993 | Phoenix Suns / Suns
1996 | Seattle SuperSonics / SuperSonics / Sonics
1997 | Utah Jazz / Jazz
1998 | Utah Jazz / Jazz`)},
{id:'lebron-finals',layout:'clued',cat:'Champions',title:"LeBron's Finals Opponents",t:150,desc:'Can you name the opponent in each of LeBron James\'s ten Finals appearances?',items:L(`2007 | San Antonio Spurs / Spurs
2011 | Dallas Mavericks / Mavericks / Mavs
2012 | Oklahoma City Thunder / Thunder / OKC
2013 | San Antonio Spurs / Spurs
2014 | San Antonio Spurs / Spurs
2015 | Golden State Warriors / Warriors
2016 | Golden State Warriors / Warriors
2017 | Golden State Warriors / Warriors
2018 | Golden State Warriors / Warriors
2020 | Miami Heat / Heat`)},
{id:'kobe-finals',layout:'clued',cat:'Champions',title:"Kobe's Finals Opponents",t:120,desc:'Can you name the opponent in each of Kobe Bryant\'s seven Finals?',items:L(`2000 | Indiana Pacers / Pacers
2001 | Philadelphia 76ers / 76ers / Sixers
2002 | New Jersey Nets / Nets
2004 | Detroit Pistons / Pistons
2008 | Boston Celtics / Celtics
2009 | Orlando Magic / Magic
2010 | Boston Celtics / Celtics`)},
{id:'curry-finals',layout:'clued',cat:'Champions',title:"Curry's Finals Opponents",t:90,desc:'Can you name the opponent in each of Stephen Curry\'s six Finals?',items:L(`2015 | Cleveland Cavaliers / Cavaliers / Cavs
2016 | Cleveland Cavaliers / Cavaliers / Cavs
2017 | Cleveland Cavaliers / Cavaliers / Cavs
2018 | Cleveland Cavaliers / Cavaliers / Cavs
2019 | Toronto Raptors / Raptors
2022 | Boston Celtics / Celtics`)},
{id:'duncan-finals',layout:'clued',cat:'Champions',title:"Duncan's Finals Opponents",t:90,desc:'Can you name the opponent in each of Tim Duncan\'s six Finals?',items:L(`1999 | New York Knicks / Knicks
2003 | New Jersey Nets / Nets
2005 | Detroit Pistons / Pistons
2007 | Cleveland Cavaliers / Cavaliers / Cavs
2013 | Miami Heat / Heat
2014 | Miami Heat / Heat`)},
// ---- journeymen ----
{id:'journeymen',layout:'table',cat:'Tables',title:'Every Team They Played For',t:480,desc:'Can you name every NBA franchise each star has played for (regular season, through 2025)?',cols:['Team','Team','Team','Team','Team','Team','Team'],rows:[
 ['LeBron James','Cleveland Cavaliers / Cavaliers / Cavs','Miami Heat / Heat','Los Angeles Lakers / Lakers'],
 ['Kevin Durant','Oklahoma City Thunder / Thunder / OKC / Seattle SuperSonics / Sonics','Golden State Warriors / Warriors','Brooklyn Nets / Nets','Phoenix Suns / Suns','Houston Rockets / Rockets'],
 ["Shaquille O'Neal",'Orlando Magic / Magic','Los Angeles Lakers / Lakers','Miami Heat / Heat','Phoenix Suns / Suns','Cleveland Cavaliers / Cavaliers / Cavs','Boston Celtics / Celtics'],
 ['James Harden','Oklahoma City Thunder / Thunder / OKC','Houston Rockets / Rockets','Brooklyn Nets / Nets','Philadelphia 76ers / 76ers / Sixers','Los Angeles Clippers / Clippers'],
 ['Chris Paul','New Orleans Hornets / Hornets / New Orleans Pelicans / Pelicans','Los Angeles Clippers / Clippers','Houston Rockets / Rockets','Oklahoma City Thunder / Thunder / OKC','Phoenix Suns / Suns','Golden State Warriors / Warriors','San Antonio Spurs / Spurs'],
 ['Kawhi Leonard','San Antonio Spurs / Spurs','Toronto Raptors / Raptors','Los Angeles Clippers / Clippers'],
 ['Kyrie Irving','Cleveland Cavaliers / Cavaliers / Cavs','Boston Celtics / Celtics','Brooklyn Nets / Nets','Dallas Mavericks / Mavericks / Mavs'],
 ['Carmelo Anthony','Denver Nuggets / Nuggets','New York Knicks / Knicks','Oklahoma City Thunder / Thunder / OKC','Houston Rockets / Rockets','Portland Trail Blazers / Trail Blazers / Blazers','Los Angeles Lakers / Lakers'],
 ['Dwight Howard','Orlando Magic / Magic','Los Angeles Lakers / Lakers','Houston Rockets / Rockets','Atlanta Hawks / Hawks','Charlotte Hornets / Hornets','Washington Wizards / Wizards','Philadelphia 76ers / 76ers / Sixers'],
 ['Russell Westbrook','Oklahoma City Thunder / Thunder / OKC','Houston Rockets / Rockets','Washington Wizards / Wizards','Los Angeles Lakers / Lakers','Los Angeles Clippers / Clippers','Denver Nuggets / Nuggets'],
 ['Dwyane Wade','Miami Heat / Heat','Chicago Bulls / Bulls','Cleveland Cavaliers / Cavaliers / Cavs'],
 ['Kevin Garnett','Minnesota Timberwolves / Timberwolves / Wolves','Boston Celtics / Celtics','Brooklyn Nets / Nets']]},
{id:'no1-by-team',layout:'table',cat:'Tables',title:'#1 Overall Picks by Franchise',t:480,desc:'Can you name every #1 overall pick each franchise has made since 1966?',cols:['Pick','Pick','Pick','Pick','Pick','Pick'],rows:[
 ['Cavaliers','Austin Carr / Carr','Brad Daugherty / Daugherty','LeBron James / LeBron / James','Kyrie Irving / Kyrie / Irving','Anthony Bennett / Bennett','Andrew Wiggins / Wiggins'],
 ['76ers','Doug Collins / Collins','Allen Iverson / Iverson / AI','Ben Simmons / Simmons','Markelle Fultz / Fultz'],
 ['Magic','Shaquille O\'Neal / Shaq / O\'Neal / Oneal','Chris Webber / Webber / C-Webb','Dwight Howard / Dwight / Howard','Paolo Banchero / Paolo / Banchero'],
 ['Rockets','Elvin Hayes / Hayes','John Lucas / Lucas','Ralph Sampson / Sampson','Hakeem Olajuwon / Olajuwon / Hakeem','Yao Ming / Yao / Ming'],
 ['Bucks','Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor / Alcindor','Kent Benson / Benson','Glenn Robinson / Big Dog / Robinson','Andrew Bogut / Bogut'],
 ['Clippers','Danny Manning / Manning','Michael Olowokandi / Olowokandi','Blake Griffin / Griffin'],
 ['Spurs','David Robinson / Robinson / Admiral','Tim Duncan / Duncan','Victor Wembanyama / Wembanyama / Wemby'],
 ['Trail Blazers','LaRue Martin / Martin','Bill Walton / Walton','Mychal Thompson / Thompson','Greg Oden / Oden'],
 ['Timberwolves','Karl-Anthony Towns / KAT / Towns','Anthony Edwards / Ant / Edwards'],
 ['Pelicans','Anthony Davis / AD / Davis','Zion Williamson / Zion / Williamson'],
 ['Wizards','Kwame Brown / Kwame / Brown','John Wall / Wall'],
 ['Nets','Derrick Coleman / Coleman','Kenyon Martin / K-Mart / Martin'],
 ['Pistons','Bob Lanier / Lanier','Cade Cunningham / Cade / Cunningham'],
 ['Hawks','Pervis Ellison / Ellison','Zaccharie Risacher / Risacher'],
 ['Mavericks','Cooper Flagg / Flagg']]},
// ---- colleges ----
{id:'colleges',layout:'clued',cat:'Lists',title:'Colleges of NBA Stars',t:480,desc:'Can you name the college each NBA star played for?',items:L(`Michael Jordan | North Carolina / UNC
Stephen Curry | Davidson
Kevin Durant | Texas / UT
Shaquille O'Neal | LSU / Louisiana State
Tim Duncan | Wake Forest
Magic Johnson | Michigan State / MSU
Larry Bird | Indiana State
Kareem Abdul-Jabbar | UCLA
Wilt Chamberlain | Kansas / KU
Bill Russell | San Francisco / USF
Hakeem Olajuwon | Houston
Patrick Ewing | Georgetown
Allen Iverson | Georgetown
Charles Barkley | Auburn
Karl Malone | Louisiana Tech / La Tech
John Stockton | Gonzaga
David Robinson | Navy
Scottie Pippen | Central Arkansas
Steve Nash | Santa Clara
Jayson Tatum | Duke
Kyrie Irving | Duke
Zion Williamson | Duke
Ja Morant | Murray State
Damian Lillard | Weber State
Russell Westbrook | UCLA
James Harden | Arizona State / ASU
Anthony Davis | Kentucky / UK
Karl-Anthony Towns | Kentucky / UK
Devin Booker | Kentucky / UK
Joel Embiid | Kansas / KU
Anthony Edwards | Georgia / UGA
Trae Young | Oklahoma / OU
Jalen Brunson | Villanova
Tyrese Haliburton | Iowa State
Chet Holmgren | Gonzaga
Donovan Mitchell | Louisville
Kawhi Leonard | San Diego State / SDSU
Chris Paul | Wake Forest
Dwyane Wade | Marquette
Carmelo Anthony | Syracuse
Chris Bosh | Georgia Tech
Paul Pierce | Kansas / KU
Ray Allen | Connecticut / UConn
Vince Carter | North Carolina / UNC
Grant Hill | Duke
Chris Mullin | St. John's / St Johns
Alonzo Mourning | Georgetown
Dikembe Mutombo | Georgetown
Clyde Drexler | Houston
Jerry West | West Virginia / WVU
Oscar Robertson | Cincinnati
John Havlicek | Ohio State
Bill Walton | UCLA
Julius Erving | Massachusetts / UMass
Isiah Thomas | Indiana / IU
James Worthy | North Carolina / UNC
Pete Maravich | LSU / Louisiana State
Cooper Flagg | Duke
Paolo Banchero | Duke
Victor Oladipo | Indiana / IU
Jimmy Butler | Marquette
Bam Adebayo | Kentucky / UK
Jaylen Brown | California / Cal / Berkeley
Jalen Williams | Santa Clara`)},
{id:'duke',layout:'list',cat:'Lists',title:'Duke Blue Devils in the NBA',t:240,desc:'Can you name these notable NBA players who played college ball at Duke?',items:L(`Kyrie Irving / Kyrie / Irving
Jayson Tatum / Tatum
Zion Williamson / Zion / Williamson
Paolo Banchero / Paolo / Banchero
Cooper Flagg / Flagg
Grant Hill / Hill
Christian Laettner / Laettner
Elton Brand / Brand
Shane Battier / Battier
Carlos Boozer / Boozer
J.J. Redick / JJ Redick / Redick
Jabari Parker / Parker
R.J. Barrett / RJ Barrett / Barrett
Brandon Ingram / Ingram
Luol Deng / Deng
Jahlil Okafor / Okafor
Mike Dunleavy / Dunleavy
Corey Maggette / Maggette
Dereck Lively II / Dereck Lively / Lively
Kyle Filipowski / Filipowski
Jared McCain / McCain`)},
{id:'kentucky',layout:'list',cat:'Lists',title:'Kentucky Wildcats in the NBA',t:240,desc:'Can you name these notable NBA players who played college ball at Kentucky?',items:L(`Anthony Davis / AD / Davis
Karl-Anthony Towns / KAT / Towns
Devin Booker / Booker / Book
John Wall / Wall
DeMarcus Cousins / Cousins / Boogie
Bam Adebayo / Bam / Adebayo
Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai
Tyrese Maxey / Maxey
Rajon Rondo / Rondo
Tyler Herro / Herro
Jamal Murray / Murray
De'Aaron Fox / DeAaron Fox / Fox
Immanuel Quickley / Quickley
Eric Bledsoe / Bledsoe
Nerlens Noel / Noel
Julius Randle / Randle
Malik Monk / Monk
Dan Issel / Issel
Jodie Meeks / Meeks
Reed Sheppard / Sheppard`)},
{id:'unc',layout:'list',cat:'Lists',title:'North Carolina Tar Heels in the NBA',t:240,desc:'Can you name these notable NBA players who played college ball at North Carolina?',items:L(`Michael Jordan / Jordan / MJ
James Worthy / Worthy
Vince Carter / Carter
Jerry Stackhouse / Stackhouse
Antawn Jamison / Jamison
Rasheed Wallace / Wallace / Sheed
Brad Daugherty / Daugherty
Sam Perkins / Perkins
Kenny Smith / Smith
Bob McAdoo / McAdoo
Billy Cunningham / Cunningham
Harrison Barnes / Barnes
Coby White / White
Danny Green / Green
Ty Lawson / Lawson
Marvin Williams / Williams
Walter Davis / Davis
Raymond Felton / Felton
Cam Johnson / Cameron Johnson / Johnson
Brandan Wright / Wright`)},
{id:'ucla',layout:'list',cat:'Lists',title:'UCLA Bruins in the NBA',t:240,desc:'Can you name these notable NBA players who played college ball at UCLA?',items:L(`Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor
Bill Walton / Walton
Russell Westbrook / Westbrook / Russ
Reggie Miller / Reggie / Miller
Kevin Love / Love
Baron Davis / Davis
Zach LaVine / LaVine
Jrue Holiday / Holiday
Gail Goodrich / Goodrich
Jamaal Wilkes / Wilkes
Lonzo Ball / Lonzo / Ball
Trevor Ariza / Ariza
Jaime Jaquez Jr. / Jaime Jaquez / Jaquez
Kyle Anderson / Anderson
Arron Afflalo / Afflalo
Darren Collison / Collison
Jordan Farmar / Farmar
Marques Johnson / Johnson
Sidney Wicks / Wicks
Kiki VanDeWeghe / Vandeweghe`)},
{id:'kansas',layout:'list',cat:'Lists',title:'Kansas Jayhawks in the NBA',t:180,desc:'Can you name these notable NBA players who played college ball at Kansas?',items:L(`Wilt Chamberlain / Wilt / Chamberlain
Joel Embiid / Embiid
Andrew Wiggins / Wiggins
Paul Pierce / Pierce
Danny Manning / Manning
Jo Jo White / JoJo White / White
Kirk Hinrich / Hinrich
Nick Collison / Collison
Marcus Morris / Marcus
Markieff Morris / Markieff
Ben McLemore / McLemore
Frank Mason / Mason
Ochai Agbaji / Agbaji
Devonte' Graham / Devonte Graham / Graham
Thomas Robinson / Robinson
Mario Chalmers / Chalmers
Brandon Rush / Rush
Raef LaFrentz / LaFrentz
Drew Gooden / Gooden
Gradey Dick / Dick`)},
{id:'georgetown',layout:'list',cat:'Lists',title:'Georgetown Hoyas in the NBA',t:150,desc:'Can you name these notable NBA players who played college ball at Georgetown?',items:L(`Patrick Ewing / Ewing
Alonzo Mourning / Mourning / Zo
Dikembe Mutombo / Mutombo / Dikembe
Allen Iverson / Iverson / AI
Jeff Green / Green
Roy Hibbert / Hibbert
Otto Porter / Otto Porter Jr. / Porter
Sleepy Floyd / Eric Floyd / Floyd
Greg Monroe / Monroe
Jahidi White / White
Mike Sweetney / Sweetney
Jaden Ivey / Ivey`)},
{id:'arizona',layout:'list',cat:'Lists',title:'Arizona Wildcats in the NBA',t:180,desc:'Can you name these notable NBA players who played college ball at Arizona?',items:L(`Jason Terry / Terry / Jet
Gilbert Arenas / Arenas / Agent Zero
Richard Jefferson / Jefferson
Mike Bibby / Bibby
Andre Iguodala / Iguodala / Iggy
Deandre Ayton / Ayton
Lauri Markkanen / Markkanen
Damon Stoudamire / Stoudamire
Sean Elliott / Elliott
Steve Kerr / Kerr
Aaron Gordon / Gordon
Bennedict Mathurin / Mathurin
Derrick Williams / Williams
Jordan Hill / Hill
Channing Frye / Frye
Luke Walton / Walton
Stanley Johnson / Johnson
T.J. McConnell / TJ McConnell / McConnell
Solomon Hill / S Hill
Josh Green / Green`)},
{id:'michigan-state',layout:'list',cat:'Lists',title:'Michigan State Spartans in the NBA',t:150,desc:'Can you name these notable NBA players who played college ball at Michigan State?',items:L(`Magic Johnson / Magic / Earvin Johnson
Draymond Green / Draymond / Green
Zach Randolph / Randolph / Z-Bo
Jason Richardson / Richardson / J-Rich
Jaren Jackson Jr. / Jaren Jackson / JJJ / Jackson
Steve Smith / Smith
Gary Harris / Harris
Miles Bridges / Bridges
Denzel Valentine / Valentine
Shannon Brown / Brown
Max Christie / Christie
Xavier Tillman / Tillman
Greg Kelser / Kelser
Scott Skiles / Skiles
Mateen Cleaves / Cleaves`)},
// ---- retired numbers ----
{id:'jazz-retired',layout:'clued',cat:'Lists',title:'Jazz Retired Numbers',t:120,desc:'Can you name the Jazz player behind each retired number?',items:L(`4 | Adrian Dantley / Dantley
7 | Pete Maravich / Pistol Pete / Maravich
12 | John Stockton / Stockton
14 | Jeff Hornacek / Hornacek
32 | Karl Malone / Malone / Mailman
35 | Darrell Griffith / Griffith / Dr Dunkenstein
53 | Mark Eaton / Eaton`)},
{id:'rockets-retired',layout:'clued',cat:'Lists',title:'Rockets Retired Numbers',t:120,desc:'Can you name the Rocket behind each retired number?',items:L(`11 | Yao Ming / Yao / Ming
22 | Clyde Drexler / Drexler / Glide
23 | Calvin Murphy / Murphy
24 | Moses Malone / Moses / Malone
34 | Hakeem Olajuwon / Olajuwon / Hakeem
44 | Elvin Hayes / Hayes
45 | Rudy Tomjanovich / Tomjanovich / Rudy T`)},
{id:'sixers-retired',layout:'clued',cat:'Lists',title:'76ers Retired Numbers',t:150,desc:'Can you name the 76er behind each retired number?',items:L(`2 | Moses Malone / Moses / Malone
3 | Allen Iverson / Iverson / AI
4 | Dolph Schayes / Schayes
6 | Julius Erving / Erving / Dr J / Dr. J
10 | Maurice Cheeks / Mo Cheeks / Cheeks
13 | Wilt Chamberlain / Wilt / Chamberlain
15 | Hal Greer / Greer
24 | Bobby Jones / Jones
32 | Billy Cunningham / Cunningham
34 | Charles Barkley / Barkley`)},
{id:'knicks-retired',layout:'clued',cat:'Lists',title:'Knicks Retired Numbers',t:150,desc:'Can you name the Knick behind each retired number?',items:L(`10 | Walt Frazier / Frazier / Clyde
12 | Dick Barnett / Barnett
15 | Earl Monroe / Monroe / Pearl / Dick McGuire / McGuire
19 | Willis Reed / Reed
22 | Dave DeBusschere / DeBusschere
24 | Bill Bradley / Bradley
33 | Patrick Ewing / Ewing`)},
{id:'pistons-retired',layout:'clued',cat:'Lists',title:'Pistons Retired Numbers',t:180,desc:'Can you name the Piston behind each retired number?',items:L(`1 | Chauncey Billups / Billups
3 | Ben Wallace / Wallace / Big Ben
4 | Joe Dumars / Dumars
10 | Dennis Rodman / Rodman / Worm
11 | Isiah Thomas / Isiah / Thomas
15 | Vinnie Johnson / Johnson / Microwave
16 | Bob Lanier / Lanier
21 | Dave Bing / Bing
32 | Richard Hamilton / Rip Hamilton / Hamilton / Rip
40 | Bill Laimbeer / Laimbeer`)},
{id:'mavs-retired',layout:'clued',cat:'Lists',title:'Mavericks Retired Numbers',t:60,desc:'Can you name the Maverick behind each retired number?',items:L(`12 | Derek Harper / Harper
15 | Brad Davis / Davis
22 | Rolando Blackman / Blackman
41 | Dirk Nowitzki / Dirk / Nowitzki`)},
{id:'suns-retired',layout:'clued',cat:'Lists',title:'Suns Retired Numbers',t:180,desc:'Can you name the Sun behind each retired number?',items:L(`5 | Dick Van Arsdale / Van Arsdale
6 | Walter Davis / Davis
7 | Kevin Johnson / KJ / Johnson
9 | Dan Majerle / Majerle / Thunder Dan
13 | Steve Nash / Nash
24 | Tom Chambers / Chambers
31 | Shawn Marion / Marion / Matrix
32 | Amar'e Stoudemire / Amare Stoudemire / Stoudemire / Amare
33 | Alvan Adams / Adams
34 | Charles Barkley / Barkley
42 | Connie Hawkins / Hawkins
44 | Paul Westphal / Westphal`)},
{id:'blazers-retired',layout:'clued',cat:'Lists',title:'Trail Blazers Retired Numbers',t:150,desc:'Can you name the Blazer behind each retired number?',items:L(`13 | Dave Twardzik / Twardzik
14 | Lionel Hollins / Hollins
15 | Larry Steele / Steele
20 | Maurice Lucas / Lucas
22 | Clyde Drexler / Drexler / Glide
30 | Terry Porter / Porter / Bob Gross / Gross
32 | Bill Walton / Walton
36 | Lloyd Neal / Neal
45 | Geoff Petrie / Petrie`)},
{id:'pacers-retired',layout:'clued',cat:'Lists',title:'Pacers Retired Numbers',t:60,desc:'Can you name the Pacer behind each retired number?',items:L(`30 | George McGinnis / McGinnis
31 | Reggie Miller / Reggie / Miller
34 | Mel Daniels / Daniels
35 | Roger Brown / Brown`)},
{id:'bucks-retired',layout:'clued',cat:'Lists',title:'Bucks Retired Numbers',t:150,desc:'Can you name the Buck behind each retired number?',items:L(`1 | Oscar Robertson / Oscar / Robertson / Big O
2 | Junior Bridgeman / Bridgeman
4 | Sidney Moncrief / Moncrief
8 | Marques Johnson / Johnson
10 | Bob Dandridge / Dandridge
14 | Jon McGlocklin / McGlocklin
16 | Bob Lanier / Lanier
32 | Brian Winters / Winters
33 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor`)},
{id:'cavs-retired',layout:'clued',cat:'Lists',title:'Cavaliers Retired Numbers',t:120,desc:'Can you name the Cavalier behind each retired number?',items:L(`7 | Bingo Smith / Smith
11 | Zydrunas Ilgauskas / Ilgauskas / Big Z
22 | Larry Nance / Nance
25 | Mark Price / Price
34 | Austin Carr / Carr
42 | Nate Thurmond / Thurmond
43 | Brad Daugherty / Daugherty`)},
{id:'nets-retired',layout:'clued',cat:'Lists',title:'Nets Retired Numbers',t:120,desc:'Can you name the Net behind each retired number?',items:L(`3 | Drazen Petrovic / Petrovic / Petrović
5 | Jason Kidd / Kidd
23 | John Williamson / Williamson
25 | Bill Melchionni / Melchionni
32 | Julius Erving / Erving / Dr J / Dr. J
52 | Buck Williams / Williams`)},
{id:'hawks-retired',layout:'clued',cat:'Lists',title:'Hawks Retired Numbers',t:90,desc:'Can you name the Hawk behind each retired number?',items:L(`9 | Bob Pettit / Pettit
21 | Dominique Wilkins / Dominique / Wilkins / Nique
23 | Lou Hudson / Hudson
44 | Pete Maravich / Pistol Pete / Maravich
55 | Dikembe Mutombo / Mutombo / Dikembe`)},
{id:'kings-retired',layout:'clued',cat:'Lists',title:'Kings Retired Numbers',t:180,desc:'Can you name the Kings/Royals player behind each retired number?',items:L(`1 | Nate Archibald / Tiny Archibald / Archibald
2 | Mitch Richmond / Richmond
4 | Chris Webber / Webber / C-Webb
11 | Bob Davies / Davies
12 | Maurice Stokes / Stokes
14 | Oscar Robertson / Oscar / Robertson / Big O
16 | Peja Stojakovic / Peja / Stojakovic / Stojaković
21 | Vlade Divac / Divac / Vlade
27 | Jack Twyman / Twyman
44 | Sam Lacey / Lacey`)},
{id:'wizards-retired',layout:'clued',cat:'Lists',title:'Wizards Retired Numbers',t:90,desc:'Can you name the Wizards/Bullets player behind each retired number?',items:L(`10 | Earl Monroe / Monroe / Pearl
11 | Elvin Hayes / Hayes
25 | Gus Johnson / Johnson
41 | Wes Unseld / Unseld
45 | Phil Chenier / Chenier`)},
{id:'nuggets-retired',layout:'clued',cat:'Lists',title:'Nuggets Retired Numbers',t:120,desc:'Can you name the Nugget behind each retired number?',items:L(`2 | Alex English / English
12 | Fat Lever / Lafayette Lever / Lever
33 | David Thompson / Thompson
40 | Byron Beck / Beck
44 | Dan Issel / Issel
55 | Dikembe Mutombo / Mutombo / Dikembe`)},
{id:'grizz-retired',layout:'clued',cat:'Lists',title:'Grizzlies Retired Numbers',t:45,desc:'Can you name the Grizzly behind each retired number?',items:L(`9 | Tony Allen / Allen
33 | Marc Gasol / Gasol
50 | Zach Randolph / Randolph / Z-Bo`)},
// ---- draft lotteries ----
{id:'lottery-2024',layout:'clued',cat:'Draft',title:'2024 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2024 NBA Draft?',items:L(`1 | Zaccharie Risacher / Risacher
2 | Alex Sarr / Alexandre Sarr / Sarr
3 | Reed Sheppard / Sheppard
4 | Stephon Castle / Castle
5 | Ron Holland / Holland
6 | Tidjane Salaun / Salaun
7 | Donovan Clingan / Clingan
8 | Rob Dillingham / Dillingham
9 | Zach Edey / Edey
10 | Cody Williams / Williams
11 | Matas Buzelis / Buzelis
12 | Nikola Topic / Topic / Topić
13 | Devin Carter / Carter
14 | Bub Carrington / Carlton Carrington / Carrington`)},
{id:'lottery-2023',layout:'clued',cat:'Draft',title:'2023 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2023 NBA Draft?',items:L(`1 | Victor Wembanyama / Wembanyama / Wemby
2 | Brandon Miller / Miller
3 | Scoot Henderson / Scoot / Henderson
4 | Amen Thompson / Amen
5 | Ausar Thompson / Ausar
6 | Anthony Black / Black
7 | Bilal Coulibaly / Coulibaly
8 | Jarace Walker / Walker
9 | Taylor Hendricks / Hendricks
10 | Cason Wallace / Wallace
11 | Jett Howard / Howard
12 | Dereck Lively II / Dereck Lively / Lively
13 | Gradey Dick / Dick
14 | Jordan Hawkins / Hawkins`)},
{id:'lottery-2022',layout:'clued',cat:'Draft',title:'2022 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2022 NBA Draft?',items:L(`1 | Paolo Banchero / Paolo / Banchero
2 | Chet Holmgren / Chet / Holmgren
3 | Jabari Smith Jr. / Jabari Smith / Smith
4 | Keegan Murray / Murray
5 | Jaden Ivey / Ivey
6 | Bennedict Mathurin / Mathurin
7 | Shaedon Sharpe / Sharpe
8 | Dyson Daniels / Daniels
9 | Jeremy Sochan / Sochan
10 | Johnny Davis / Davis
11 | Ousmane Dieng / Dieng
12 | Jalen Williams / J-Dub / JDub / Williams
13 | Jalen Duren / Duren
14 | Ochai Agbaji / Agbaji`)},
{id:'lottery-2021',layout:'clued',cat:'Draft',title:'2021 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2021 NBA Draft?',items:L(`1 | Cade Cunningham / Cade / Cunningham
2 | Jalen Green / Green
3 | Evan Mobley / Mobley
4 | Scottie Barnes / Barnes
5 | Jalen Suggs / Suggs
6 | Josh Giddey / Giddey
7 | Jonathan Kuminga / Kuminga
8 | Franz Wagner / Wagner
9 | Davion Mitchell / Mitchell
10 | Ziaire Williams / Williams
11 | James Bouknight / Bouknight
12 | Joshua Primo / Josh Primo / Primo
13 | Chris Duarte / Duarte
14 | Moses Moody / Moody`)},
{id:'lottery-2020',layout:'clued',cat:'Draft',title:'2020 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2020 NBA Draft?',items:L(`1 | Anthony Edwards / Ant / Edwards / Ant-Man
2 | James Wiseman / Wiseman
3 | LaMelo Ball / LaMelo / Ball
4 | Patrick Williams / Williams
5 | Isaac Okoro / Okoro
6 | Onyeka Okongwu / Okongwu
7 | Killian Hayes / Hayes
8 | Obi Toppin / Toppin
9 | Deni Avdija / Avdija
10 | Jalen Smith / Smith
11 | Devin Vassell / Vassell
12 | Tyrese Haliburton / Haliburton / Hali
13 | Kira Lewis Jr. / Kira Lewis / Lewis
14 | Aaron Nesmith / Nesmith`)},
{id:'lottery-2019',layout:'clued',cat:'Draft',title:'2019 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2019 NBA Draft?',items:L(`1 | Zion Williamson / Zion / Williamson
2 | Ja Morant / Ja / Morant
3 | RJ Barrett / R.J. Barrett / Barrett
4 | De'Andre Hunter / DeAndre Hunter / Hunter
5 | Darius Garland / Garland
6 | Jarrett Culver / Culver
7 | Coby White / White
8 | Jaxson Hayes / Hayes
9 | Rui Hachimura / Hachimura / Rui
10 | Cam Reddish / Reddish
11 | Cameron Johnson / Cam Johnson / Johnson
12 | P.J. Washington / PJ Washington / Washington
13 | Tyler Herro / Herro
14 | Romeo Langford / Langford`)},
{id:'lottery-2017',layout:'clued',cat:'Draft',title:'2017 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2017 NBA Draft?',items:L(`1 | Markelle Fultz / Fultz
2 | Lonzo Ball / Lonzo / Ball
3 | Jayson Tatum / Tatum
4 | Josh Jackson / Jackson
5 | De'Aaron Fox / DeAaron Fox / Fox
6 | Jonathan Isaac / Isaac
7 | Lauri Markkanen / Markkanen
8 | Frank Ntilikina / Ntilikina
9 | Dennis Smith Jr. / Dennis Smith / Smith
10 | Zach Collins / Collins
11 | Malik Monk / Monk
12 | Luke Kennard / Kennard
13 | Donovan Mitchell / Mitchell / Spida
14 | Bam Adebayo / Bam / Adebayo`)},
{id:'lottery-2016',layout:'clued',cat:'Draft',title:'2016 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2016 NBA Draft?',items:L(`1 | Ben Simmons / Simmons
2 | Brandon Ingram / Ingram
3 | Jaylen Brown / Brown
4 | Dragan Bender / Bender
5 | Kris Dunn / Dunn
6 | Buddy Hield / Hield
7 | Jamal Murray / Murray
8 | Marquese Chriss / Chriss
9 | Jakob Poeltl / Poeltl / Pöltl
10 | Thon Maker / Maker
11 | Domantas Sabonis / Sabonis
12 | Taurean Prince / Prince
13 | Georgios Papagiannis / Papagiannis
14 | Denzel Valentine / Valentine`)},
{id:'lottery-2015',layout:'clued',cat:'Draft',title:'2015 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2015 NBA Draft?',items:L(`1 | Karl-Anthony Towns / KAT / Towns
2 | D'Angelo Russell / DAngelo Russell / DLo / Russell
3 | Jahlil Okafor / Okafor
4 | Kristaps Porzingis / Porzingis / Porziņģis
5 | Mario Hezonja / Hezonja
6 | Willie Cauley-Stein / Cauley-Stein
7 | Emmanuel Mudiay / Mudiay
8 | Stanley Johnson / Johnson
9 | Frank Kaminsky / Kaminsky
10 | Justise Winslow / Winslow
11 | Myles Turner / Turner
12 | Trey Lyles / Lyles
13 | Devin Booker / Booker / Book
14 | Cameron Payne / Payne`)},
{id:'lottery-2014',layout:'clued',cat:'Draft',title:'2014 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2014 NBA Draft?',items:L(`1 | Andrew Wiggins / Wiggins
2 | Jabari Parker / Parker
3 | Joel Embiid / Embiid
4 | Aaron Gordon / Gordon
5 | Dante Exum / Exum
6 | Marcus Smart / Smart
7 | Julius Randle / Randle
8 | Nik Stauskas / Stauskas
9 | Noah Vonleh / Vonleh
10 | Elfrid Payton / Payton
11 | Doug McDermott / McDermott
12 | Dario Saric / Saric / Šarić
13 | Zach LaVine / LaVine
14 | T.J. Warren / TJ Warren / Warren`)},
{id:'lottery-2013',layout:'clued',cat:'Draft',title:'2013 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2013 NBA Draft?',items:L(`1 | Anthony Bennett / Bennett
2 | Victor Oladipo / Oladipo
3 | Otto Porter / Otto Porter Jr. / Porter
4 | Cody Zeller / Zeller
5 | Alex Len / Len
6 | Nerlens Noel / Noel
7 | Ben McLemore / McLemore
8 | Kentavious Caldwell-Pope / KCP / Caldwell-Pope
9 | Trey Burke / Burke
10 | C.J. McCollum / CJ McCollum / McCollum
11 | Michael Carter-Williams / Carter-Williams / MCW
12 | Steven Adams / Adams
13 | Kelly Olynyk / Olynyk
14 | Shabazz Muhammad / Muhammad`)},
{id:'lottery-2012',layout:'clued',cat:'Draft',title:'2012 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2012 NBA Draft?',items:L(`1 | Anthony Davis / AD / Davis
2 | Michael Kidd-Gilchrist / Kidd-Gilchrist / MKG
3 | Bradley Beal / Beal
4 | Dion Waiters / Waiters
5 | Thomas Robinson / Robinson
6 | Damian Lillard / Lillard / Dame
7 | Harrison Barnes / Barnes
8 | Terrence Ross / Ross
9 | Andre Drummond / Drummond
10 | Austin Rivers / Rivers
11 | Meyers Leonard / Leonard
12 | Jeremy Lamb / Lamb
13 | Kendall Marshall / Marshall
14 | John Henson / Henson`)},
{id:'lottery-2011',layout:'clued',cat:'Draft',title:'2011 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2011 NBA Draft?',items:L(`1 | Kyrie Irving / Kyrie / Irving
2 | Derrick Williams / Williams
3 | Enes Kanter / Enes Freedom / Kanter / Freedom
4 | Tristan Thompson / Thompson
5 | Jonas Valanciunas / Valanciunas / Valančiūnas
6 | Jan Vesely / Vesely
7 | Bismack Biyombo / Biyombo
8 | Brandon Knight / Knight
9 | Kemba Walker / Kemba / Walker
10 | Jimmer Fredette / Jimmer / Fredette
11 | Klay Thompson / Klay
12 | Alec Burks / Burks
13 | Markieff Morris / Markieff
14 | Marcus Morris / Marcus`)},
{id:'lottery-2010',layout:'clued',cat:'Draft',title:'2010 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2010 NBA Draft?',items:L(`1 | John Wall / Wall
2 | Evan Turner / Turner
3 | Derrick Favors / Favors
4 | Wesley Johnson / Johnson
5 | DeMarcus Cousins / Cousins / Boogie
6 | Ekpe Udoh / Udoh
7 | Greg Monroe / Monroe
8 | Al-Farouq Aminu / Aminu
9 | Gordon Hayward / Hayward
10 | Paul George / PG / PG13 / George
11 | Cole Aldrich / Aldrich
12 | Xavier Henry / Henry
13 | Ed Davis / Davis
14 | Patrick Patterson / Patterson`)},
{id:'lottery-2008',layout:'clued',cat:'Draft',title:'2008 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2008 NBA Draft?',items:L(`1 | Derrick Rose / Rose
2 | Michael Beasley / Beasley
3 | O.J. Mayo / OJ Mayo / Mayo
4 | Russell Westbrook / Westbrook / Russ
5 | Kevin Love / Love
6 | Danilo Gallinari / Gallinari / Gallo
7 | Eric Gordon / Gordon
8 | Joe Alexander / Alexander
9 | D.J. Augustin / DJ Augustin / Augustin
10 | Brook Lopez / Lopez
11 | Jerryd Bayless / Bayless
12 | Jason Thompson / Thompson
13 | Brandon Rush / Rush
14 | Anthony Randolph / Randolph`)},
{id:'lottery-2007',layout:'clued',cat:'Draft',title:'2007 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2007 NBA Draft?',items:L(`1 | Greg Oden / Oden
2 | Kevin Durant / Durant / KD
3 | Al Horford / Horford
4 | Mike Conley / Conley
5 | Jeff Green / Green
6 | Yi Jianlian / Yi / Jianlian
7 | Corey Brewer / Brewer
8 | Brandan Wright / Wright
9 | Joakim Noah / Noah
10 | Spencer Hawes / Hawes
11 | Acie Law / Law
12 | Thaddeus Young / Young
13 | Julian Wright / J Wright
14 | Al Thornton / Thornton`)},
{id:'lottery-2005',layout:'clued',cat:'Draft',title:'2005 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2005 NBA Draft?',items:L(`1 | Andrew Bogut / Bogut
2 | Marvin Williams / M Williams
3 | Deron Williams / D-Will / D Williams
4 | Chris Paul / CP3 / Paul
5 | Raymond Felton / Felton
6 | Martell Webster / Webster
7 | Charlie Villanueva / Villanueva
8 | Channing Frye / Frye
9 | Ike Diogu / Diogu
10 | Andrew Bynum / Bynum
11 | Fran Vazquez / Vazquez
12 | Yaroslav Korolev / Korolev
13 | Sean May / May
14 | Rashad McCants / McCants`)},
{id:'lottery-2004',layout:'clued',cat:'Draft',title:'2004 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2004 NBA Draft?',items:L(`1 | Dwight Howard / Dwight / Howard
2 | Emeka Okafor / Okafor
3 | Ben Gordon / Gordon
4 | Shaun Livingston / Livingston
5 | Devin Harris / Harris
6 | Josh Childress / Childress
7 | Luol Deng / Deng
8 | Rafael Araujo / Araujo
9 | Andre Iguodala / Iguodala / Iggy
10 | Luke Jackson / Jackson
11 | Andris Biedrins / Biedrins
12 | Robert Swift / Swift
13 | Sebastian Telfair / Telfair
14 | Kris Humphries / Humphries`)},
{id:'lottery-1998',layout:'clued',cat:'Draft',title:'1998 Draft Lottery Picks',t:240,desc:'Can you name the 13 lottery picks of the 1998 NBA Draft?',items:L(`1 | Michael Olowokandi / Olowokandi / Kandi Man
2 | Mike Bibby / Bibby
3 | Raef LaFrentz / LaFrentz
4 | Antawn Jamison / Jamison
5 | Vince Carter / Carter / Vinsanity
6 | Robert Traylor / Traylor / Tractor Traylor
7 | Jason Williams / White Chocolate / Williams
8 | Larry Hughes / Hughes
9 | Dirk Nowitzki / Dirk / Nowitzki
10 | Paul Pierce / Pierce
11 | Bonzi Wells / Wells
12 | Michael Doleac / Doleac
13 | Keon Clark / Clark`)},
];
Q6.forEach(q=>QUIZZES.push(q));

// ---- decade slices of the big year quizzes (grouped under the "Decades" chip) ----
function decadeSlices(srcId,label,descFn,first,last){
  const src=QUIZZES.find(q=>q.id===srcId); if(!src) return;
  for(let d=first; d<=last; d+=10){
    const items=src.items.filter(l=>{ const y=parseInt(l,10); return y>=d&&y<d+10; }); if(items.length<4) continue;
    const name=d+'s'; QUIZZES.push({id:srcId+'-'+d,layout:'clued',cat:'Decades',title:`${label} of the ${name}`,t:Math.max(60,Math.min(300,items.length*15)),desc:descFn(name),items});
  }
}
decadeSlices('champs','NBA Champions',n=>`Can you name the NBA champion for every season of the ${n}?`,1950,2020);
decadeSlices('runnerup','Finals Runners-Up',n=>`Can you name the team that lost the Finals each year of the ${n}?`,1950,2020);
decadeSlices('mvp-year','NBA MVPs',n=>`Can you name the NBA MVP for every season of the ${n}?`,1960,2020);
decadeSlices('fmvp-year','Finals MVPs',n=>`Can you name the Finals MVP for every year of the ${n}?`,1970,2020);
decadeSlices('draft1','#1 Overall Picks',n=>`Can you name the #1 overall pick of every draft in the ${n}?`,1970,2020);
decadeSlices('roy','Rookies of the Year',n=>`Can you name the Rookie of the Year for every season of the ${n}?`,1960,2020);
decadeSlices('scoring-year','Scoring Champions',n=>`Can you name the scoring champion for every season of the ${n}?`,1950,2020);
decadeSlices('reb-year','Rebounding Leaders',n=>`Can you name the rebounding leader for every season of the ${n}?`,1960,2020);
decadeSlices('ast-year','Assist Leaders',n=>`Can you name the assists leader for every season of the ${n}?`,1960,2020);
// strip placeholder cells from ragged tables
QUIZZES.forEach(q=>{ if(q.layout==='table') q.rows=q.rows.map(r=>r.filter(c=>c&&c!=='—')); });
