const L=s=>s.trim().split('\n').map(x=>x.trim()).filter(Boolean);
const TEAMS=`Atlanta Hawks / Hawks
Boston Celtics / Celtics
Brooklyn Nets / Nets
Charlotte Hornets / Hornets
Chicago Bulls / Bulls
Cleveland Cavaliers / Cavaliers / Cavs
Dallas Mavericks / Mavericks / Mavs
Denver Nuggets / Nuggets
Detroit Pistons / Pistons
Golden State Warriors / Warriors / Dubs
Houston Rockets / Rockets
Indiana Pacers / Pacers
Los Angeles Clippers / Clippers / LA Clippers
Los Angeles Lakers / Lakers / LA Lakers
Memphis Grizzlies / Grizzlies
Miami Heat / Heat
Milwaukee Bucks / Bucks
Minnesota Timberwolves / Timberwolves / Wolves
New Orleans Pelicans / Pelicans / Pels
New York Knicks / Knicks
Oklahoma City Thunder / Thunder / OKC
Orlando Magic / Magic
Philadelphia 76ers / 76ers / Sixers
Phoenix Suns / Suns
Portland Trail Blazers / Trail Blazers / Blazers
Sacramento Kings / Kings
San Antonio Spurs / Spurs
Toronto Raptors / Raptors
Utah Jazz / Jazz
Washington Wizards / Wizards`;
const QUIZZES=[
{id:'teams',title:'NBA Teams',t:360,items:L(TEAMS)},
{id:'teams60',title:'30 in 60: NBA Teams',t:60,items:L(TEAMS)},
{id:'not-s',title:"Teams Not Ending in 'S'",t:30,items:L(`Miami Heat / Heat
Utah Jazz / Jazz
Orlando Magic / Magic
Oklahoma City Thunder / Thunder / OKC`)},
{id:'cities',title:'NBA Cities',t:180,items:L(`Atlanta
Boston
Brooklyn
Charlotte
Chicago
Cleveland
Dallas
Denver
Detroit
San Francisco / Golden State / Oakland
Houston
Indianapolis
Los Angeles / LA
Memphis
Miami
Milwaukee
Minneapolis / Minnesota
New Orleans
New York / New York City / NYC
Oklahoma City / OKC
Orlando
Philadelphia / Philly
Phoenix
Portland
Sacramento
San Antonio
Toronto
Salt Lake City / Utah
Washington / Washington DC / DC`)},
{id:'arenas',title:'NBA Arenas',t:360,items:L(`Warriors | Chase Center
Celtics | TD Garden
Knicks | Madison Square Garden / MSG / The Garden
Lakers | Crypto.com Arena / Crypto Arena / Staples Center
Clippers | Intuit Dome
Bulls | United Center
Heat | Kaseya Center / American Airlines Arena / FTX Arena
Nets | Barclays Center
Hawks | State Farm Arena / Philips Arena
Hornets | Spectrum Center / Time Warner Cable Arena
Cavaliers | Rocket Arena / Rocket Mortgage FieldHouse / Quicken Loans Arena / The Q
Mavericks | American Airlines Center
Nuggets | Ball Arena / Pepsi Center
Pistons | Little Caesars Arena
Rockets | Toyota Center
Pacers | Gainbridge Fieldhouse / Bankers Life Fieldhouse / Conseco Fieldhouse
Grizzlies | FedExForum / FedEx Forum
Bucks | Fiserv Forum
Timberwolves | Target Center
Pelicans | Smoothie King Center
Thunder | Paycom Center / Chesapeake Energy Arena
Magic | Kia Center / Amway Center
76ers | Xfinity Mobile Arena / Wells Fargo Center
Suns | Mortgage Matchup Center / Footprint Center / Talking Stick Resort Arena
Trail Blazers | Moda Center / Rose Garden
Kings | Golden 1 Center
Spurs | Frost Bank Center / AT&T Center
Raptors | Scotiabank Arena / Air Canada Centre
Jazz | Delta Center / Vivint Arena
Wizards | Capital One Arena / Verizon Center`)},
{id:'champs',title:'NBA Champions by Year',t:720,items:L(`1947 | Philadelphia Warriors / Warriors
1948 | Baltimore Bullets / Bullets
1949 | Minneapolis Lakers / Lakers
1950 | Minneapolis Lakers / Lakers
1951 | Rochester Royals / Royals
1952 | Minneapolis Lakers / Lakers
1953 | Minneapolis Lakers / Lakers
1954 | Minneapolis Lakers / Lakers
1955 | Syracuse Nationals / Nationals / Nats
1956 | Philadelphia Warriors / Warriors
1957 | Boston Celtics / Celtics
1958 | St. Louis Hawks / St Louis Hawks / Hawks
1959 | Boston Celtics / Celtics
1960 | Boston Celtics / Celtics
1961 | Boston Celtics / Celtics
1962 | Boston Celtics / Celtics
1963 | Boston Celtics / Celtics
1964 | Boston Celtics / Celtics
1965 | Boston Celtics / Celtics
1966 | Boston Celtics / Celtics
1967 | Philadelphia 76ers / 76ers / Sixers
1968 | Boston Celtics / Celtics
1969 | Boston Celtics / Celtics
1970 | New York Knicks / Knicks
1971 | Milwaukee Bucks / Bucks
1972 | Los Angeles Lakers / Lakers
1973 | New York Knicks / Knicks
1974 | Boston Celtics / Celtics
1975 | Golden State Warriors / Warriors
1976 | Boston Celtics / Celtics
1977 | Portland Trail Blazers / Trail Blazers / Blazers
1978 | Washington Bullets / Bullets
1979 | Seattle SuperSonics / SuperSonics / Sonics
1980 | Los Angeles Lakers / Lakers
1981 | Boston Celtics / Celtics
1982 | Los Angeles Lakers / Lakers
1983 | Philadelphia 76ers / 76ers / Sixers
1984 | Boston Celtics / Celtics
1985 | Los Angeles Lakers / Lakers
1986 | Boston Celtics / Celtics
1987 | Los Angeles Lakers / Lakers
1988 | Los Angeles Lakers / Lakers
1989 | Detroit Pistons / Pistons
1990 | Detroit Pistons / Pistons
1991 | Chicago Bulls / Bulls
1992 | Chicago Bulls / Bulls
1993 | Chicago Bulls / Bulls
1994 | Houston Rockets / Rockets
1995 | Houston Rockets / Rockets
1996 | Chicago Bulls / Bulls
1997 | Chicago Bulls / Bulls
1998 | Chicago Bulls / Bulls
1999 | San Antonio Spurs / Spurs
2000 | Los Angeles Lakers / Lakers
2001 | Los Angeles Lakers / Lakers
2002 | Los Angeles Lakers / Lakers
2003 | San Antonio Spurs / Spurs
2004 | Detroit Pistons / Pistons
2005 | San Antonio Spurs / Spurs
2006 | Miami Heat / Heat
2007 | San Antonio Spurs / Spurs
2008 | Boston Celtics / Celtics
2009 | Los Angeles Lakers / Lakers
2010 | Los Angeles Lakers / Lakers
2011 | Dallas Mavericks / Mavericks / Mavs
2012 | Miami Heat / Heat
2013 | Miami Heat / Heat
2014 | San Antonio Spurs / Spurs
2015 | Golden State Warriors / Warriors
2016 | Cleveland Cavaliers / Cavaliers / Cavs
2017 | Golden State Warriors / Warriors
2018 | Golden State Warriors / Warriors
2019 | Toronto Raptors / Raptors
2020 | Los Angeles Lakers / Lakers
2021 | Milwaukee Bucks / Bucks
2022 | Golden State Warriors / Warriors
2023 | Denver Nuggets / Nuggets
2024 | Boston Celtics / Celtics
2025 | Oklahoma City Thunder / Thunder / OKC`)},
{id:'champ-franchises',title:'Championship Franchises',t:240,items:L(`Boston Celtics / Celtics
Los Angeles Lakers / Lakers / Minneapolis Lakers
Golden State Warriors / Warriors / Philadelphia Warriors
Chicago Bulls / Bulls
San Antonio Spurs / Spurs
Philadelphia 76ers / 76ers / Sixers / Syracuse Nationals
Detroit Pistons / Pistons
Miami Heat / Heat
New York Knicks / Knicks
Houston Rockets / Rockets
Milwaukee Bucks / Bucks
Cleveland Cavaliers / Cavaliers / Cavs
Atlanta Hawks / Hawks / St. Louis Hawks / St Louis Hawks
Sacramento Kings / Kings / Rochester Royals
Washington Wizards / Wizards / Washington Bullets / Bullets
Oklahoma City Thunder / Thunder / OKC / Seattle SuperSonics / SuperSonics / Sonics
Portland Trail Blazers / Trail Blazers / Blazers
Dallas Mavericks / Mavericks / Mavs
Toronto Raptors / Raptors
Denver Nuggets / Nuggets`)},
{id:'mvp-year',title:'NBA MVPs by Year',t:600,items:L(`1956 | Bob Pettit / Pettit
1957 | Bob Cousy / Cousy
1958 | Bill Russell / Russell
1959 | Bob Pettit / Pettit
1960 | Wilt Chamberlain / Wilt / Chamberlain
1961 | Bill Russell / Russell
1962 | Bill Russell / Russell
1963 | Bill Russell / Russell
1964 | Oscar Robertson / Oscar / Robertson / Big O
1965 | Bill Russell / Russell
1966 | Wilt Chamberlain / Wilt / Chamberlain
1967 | Wilt Chamberlain / Wilt / Chamberlain
1968 | Wilt Chamberlain / Wilt / Chamberlain
1969 | Wes Unseld / Unseld
1970 | Willis Reed / Reed
1971 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor / Alcindor
1972 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
1973 | Dave Cowens / Cowens
1974 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
1975 | Bob McAdoo / McAdoo
1976 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
1977 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
1978 | Bill Walton / Walton
1979 | Moses Malone / Moses / M Malone
1980 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
1981 | Julius Erving / Erving / Dr J / Dr. J
1982 | Moses Malone / Moses / M Malone
1983 | Moses Malone / Moses / M Malone
1984 | Larry Bird / Bird
1985 | Larry Bird / Bird
1986 | Larry Bird / Bird
1987 | Magic Johnson / Magic / Earvin Johnson
1988 | Michael Jordan / Jordan / MJ
1989 | Magic Johnson / Magic / Earvin Johnson
1990 | Magic Johnson / Magic / Earvin Johnson
1991 | Michael Jordan / Jordan / MJ
1992 | Michael Jordan / Jordan / MJ
1993 | Charles Barkley / Barkley
1994 | Hakeem Olajuwon / Olajuwon / Hakeem
1995 | David Robinson / Robinson / Admiral
1996 | Michael Jordan / Jordan / MJ
1997 | Karl Malone / K Malone / Mailman
1998 | Michael Jordan / Jordan / MJ
1999 | Karl Malone / K Malone / Mailman
2000 | Shaquille O'Neal / Shaq / O'Neal / Oneal
2001 | Allen Iverson / Iverson / AI
2002 | Tim Duncan / Duncan
2003 | Tim Duncan / Duncan
2004 | Kevin Garnett / Garnett / KG
2005 | Steve Nash / Nash
2006 | Steve Nash / Nash
2007 | Dirk Nowitzki / Dirk / Nowitzki
2008 | Kobe Bryant / Kobe / Bryant
2009 | LeBron James / LeBron / James
2010 | LeBron James / LeBron / James
2011 | Derrick Rose / Rose
2012 | LeBron James / LeBron / James
2013 | LeBron James / LeBron / James
2014 | Kevin Durant / Durant / KD
2015 | Stephen Curry / Steph Curry / Curry / Steph
2016 | Stephen Curry / Steph Curry / Curry / Steph
2017 | Russell Westbrook / Westbrook / Russ
2018 | James Harden / Harden
2019 | Giannis Antetokounmpo / Giannis / Antetokounmpo
2020 | Giannis Antetokounmpo / Giannis / Antetokounmpo
2021 | Nikola Jokic / Jokic / Nikola Jokić / Jokić / Joker
2022 | Nikola Jokic / Jokic / Nikola Jokić / Jokić / Joker
2023 | Joel Embiid / Embiid
2024 | Nikola Jokic / Jokic / Nikola Jokić / Jokić / Joker
2025 | Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai`)},
{id:'mvp',title:'NBA MVPs',t:420,items:L(`Bob Pettit / Pettit
Bob Cousy / Cousy
Bill Russell / Russell
Wilt Chamberlain / Wilt / Chamberlain
Oscar Robertson / Oscar / Robertson / Big O
Wes Unseld / Unseld
Willis Reed / Reed
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor
Dave Cowens / Cowens
Bob McAdoo / McAdoo
Bill Walton / Walton
Moses Malone / Moses / M Malone
Julius Erving / Erving / Dr J / Dr. J
Larry Bird / Bird
Magic Johnson / Magic / Earvin Johnson
Michael Jordan / Jordan / MJ
Charles Barkley / Barkley
Hakeem Olajuwon / Olajuwon / Hakeem
David Robinson / D Robinson / Robinson / Admiral
Karl Malone / K Malone / Mailman
Shaquille O'Neal / Shaq / O'Neal / Oneal
Allen Iverson / Iverson / AI
Tim Duncan / Duncan
Kevin Garnett / Garnett / KG
Steve Nash / Nash
Dirk Nowitzki / Dirk / Nowitzki
Kobe Bryant / Kobe / Bryant
LeBron James / LeBron / James
Derrick Rose / Rose
Kevin Durant / Durant / KD
Stephen Curry / Steph Curry / Curry / Steph
Russell Westbrook / Westbrook / Russ
James Harden / Harden
Giannis Antetokounmpo / Giannis / Antetokounmpo
Nikola Jokic / Jokic / Nikola Jokić / Jokić / Joker
Joel Embiid / Embiid
Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai`)},
{id:'multi-mvp',title:'Players With Multiple MVPs',t:180,items:L(`6 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
5 | Michael Jordan / Jordan / MJ
5 | Bill Russell / Russell
4 | Wilt Chamberlain / Wilt / Chamberlain
4 | LeBron James / LeBron / James
3 | Moses Malone / Moses / M Malone
3 | Larry Bird / Bird
3 | Magic Johnson / Magic / Earvin Johnson
3 | Nikola Jokic / Jokic / Nikola Jokić / Jokić / Joker
2 | Bob Pettit / Pettit
2 | Karl Malone / K Malone / Mailman
2 | Tim Duncan / Duncan
2 | Steve Nash / Nash
2 | Stephen Curry / Steph Curry / Curry / Steph
2 | Giannis Antetokounmpo / Giannis / Antetokounmpo`)},
{id:'fmvp-year',title:'Finals MVPs by Year',t:600,items:L(`1969 | Jerry West / West
1970 | Willis Reed / Reed
1971 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor / Alcindor
1972 | Wilt Chamberlain / Wilt / Chamberlain
1973 | Willis Reed / Reed
1974 | John Havlicek / Havlicek / Hondo
1975 | Rick Barry / Barry
1976 | Jo Jo White / JoJo White / White
1977 | Bill Walton / Walton
1978 | Wes Unseld / Unseld
1979 | Dennis Johnson / D Johnson / DJ
1980 | Magic Johnson / Magic / Earvin Johnson
1981 | Cedric Maxwell / Maxwell / Cornbread
1982 | Magic Johnson / Magic / Earvin Johnson
1983 | Moses Malone / Moses / M Malone
1984 | Larry Bird / Bird
1985 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
1986 | Larry Bird / Bird
1987 | Magic Johnson / Magic / Earvin Johnson
1988 | James Worthy / Worthy
1989 | Joe Dumars / Dumars
1990 | Isiah Thomas / Isiah / Thomas
1991 | Michael Jordan / Jordan / MJ
1992 | Michael Jordan / Jordan / MJ
1993 | Michael Jordan / Jordan / MJ
1994 | Hakeem Olajuwon / Olajuwon / Hakeem
1995 | Hakeem Olajuwon / Olajuwon / Hakeem
1996 | Michael Jordan / Jordan / MJ
1997 | Michael Jordan / Jordan / MJ
1998 | Michael Jordan / Jordan / MJ
1999 | Tim Duncan / Duncan
2000 | Shaquille O'Neal / Shaq / O'Neal / Oneal
2001 | Shaquille O'Neal / Shaq / O'Neal / Oneal
2002 | Shaquille O'Neal / Shaq / O'Neal / Oneal
2003 | Tim Duncan / Duncan
2004 | Chauncey Billups / Billups
2005 | Tim Duncan / Duncan
2006 | Dwyane Wade / Wade
2007 | Tony Parker / Parker
2008 | Paul Pierce / Pierce
2009 | Kobe Bryant / Kobe / Bryant
2010 | Kobe Bryant / Kobe / Bryant
2011 | Dirk Nowitzki / Dirk / Nowitzki
2012 | LeBron James / LeBron / James
2013 | LeBron James / LeBron / James
2014 | Kawhi Leonard / Kawhi / Leonard
2015 | Andre Iguodala / Iguodala / Iggy
2016 | LeBron James / LeBron / James
2017 | Kevin Durant / Durant / KD
2018 | Kevin Durant / Durant / KD
2019 | Kawhi Leonard / Kawhi / Leonard
2020 | LeBron James / LeBron / James
2021 | Giannis Antetokounmpo / Giannis / Antetokounmpo
2022 | Stephen Curry / Steph Curry / Curry / Steph
2023 | Nikola Jokic / Jokic / Nikola Jokić / Jokić / Joker
2024 | Jaylen Brown / Brown
2025 | Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai`)},
{id:'fmvp',title:'Finals MVPs',t:420,items:L(`Jerry West / West
Willis Reed / Reed
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Wilt Chamberlain / Wilt / Chamberlain
John Havlicek / Havlicek / Hondo
Rick Barry / Barry
Jo Jo White / JoJo White / White
Bill Walton / Walton
Wes Unseld / Unseld
Dennis Johnson / D Johnson / DJ
Magic Johnson / Magic / Earvin Johnson
Cedric Maxwell / Maxwell / Cornbread
Moses Malone / Moses / M Malone
Larry Bird / Bird
James Worthy / Worthy
Joe Dumars / Dumars
Isiah Thomas / Isiah / Thomas
Michael Jordan / Jordan / MJ
Hakeem Olajuwon / Olajuwon / Hakeem
Tim Duncan / Duncan
Shaquille O'Neal / Shaq / O'Neal / Oneal
Chauncey Billups / Billups
Dwyane Wade / Wade
Tony Parker / Parker
Paul Pierce / Pierce
Kobe Bryant / Kobe / Bryant
Dirk Nowitzki / Dirk / Nowitzki
LeBron James / LeBron / James
Kawhi Leonard / Kawhi / Leonard
Andre Iguodala / Iguodala / Iggy
Kevin Durant / Durant / KD
Giannis Antetokounmpo / Giannis / Antetokounmpo
Stephen Curry / Steph Curry / Curry / Steph
Nikola Jokic / Jokic / Nikola Jokić / Jokić / Joker
Jaylen Brown / Brown
Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai`)},
{id:'asg-mvp',title:'All-Star Game MVPs',t:480,items:L(`Ed Macauley / Macauley
Bob Cousy / Cousy
George Mikan / Mikan
Jim Pollard / Pollard
Bill Sharman / Sharman
Bob Pettit / Pettit
Elgin Baylor / Baylor
Wilt Chamberlain / Wilt / Chamberlain
Oscar Robertson / Oscar / Robertson
Bill Russell / Russell
Jerry Lucas / Lucas
Adrian Smith / A Smith
Rick Barry / Barry
Hal Greer / Greer
Willis Reed / Reed
Lenny Wilkens / Wilkens
Jerry West / West
Bob Lanier / Lanier
Walt Frazier / Frazier / Clyde
Dave Bing / Bing
Julius Erving / Erving / Dr J / Dr. J
Randy Smith / R Smith
David Thompson / Thompson
George Gervin / Gervin / Iceman
Nate Archibald / Tiny Archibald / Archibald
Larry Bird / Bird
Isiah Thomas / Isiah / Thomas
Ralph Sampson / Sampson
Tom Chambers / Chambers
Michael Jordan / Jordan / MJ
Karl Malone / K Malone / Mailman
Magic Johnson / Magic / Earvin Johnson
Charles Barkley / Barkley
John Stockton / Stockton
Mitch Richmond / Richmond
Scottie Pippen / Pippen
Glen Rice / Rice
Shaquille O'Neal / Shaq / O'Neal / Oneal
Tim Duncan / Duncan
Kobe Bryant / Kobe / Bryant
Allen Iverson / Iverson / AI
Kevin Garnett / Garnett / KG
LeBron James / LeBron / James
Dwyane Wade / Wade
Chris Paul / CP3 / Paul
Kyrie Irving / Kyrie / Irving
Russell Westbrook / Westbrook / Russ
Anthony Davis / AD / Davis
Giannis Antetokounmpo / Giannis / Antetokounmpo
Kawhi Leonard / Kawhi / Leonard
Stephen Curry / Steph Curry / Curry / Steph
Jayson Tatum / Tatum
Damian Lillard / Lillard / Dame`)},
{id:'draft1',title:'#1 Overall Picks',t:600,items:L(`1985 | Patrick Ewing / Ewing
1986 | Brad Daugherty / Daugherty
1987 | David Robinson / Robinson / Admiral
1988 | Danny Manning / Manning
1989 | Pervis Ellison / Ellison
1990 | Derrick Coleman / Coleman
1991 | Larry Johnson / L Johnson / Grandmama
1992 | Shaquille O'Neal / Shaq / O'Neal / Oneal
1993 | Chris Webber / Webber / C-Webb
1994 | Glenn Robinson / Big Dog / G Robinson
1995 | Joe Smith / Smith
1996 | Allen Iverson / Iverson / AI
1997 | Tim Duncan / Duncan
1998 | Michael Olowokandi / Olowokandi / Kandi Man
1999 | Elton Brand / Brand
2000 | Kenyon Martin / K-Mart / Martin
2001 | Kwame Brown / Kwame / Brown
2002 | Yao Ming / Yao / Ming
2003 | LeBron James / LeBron / James
2004 | Dwight Howard / Dwight / Howard
2005 | Andrew Bogut / Bogut
2006 | Andrea Bargnani / Bargnani
2007 | Greg Oden / Oden
2008 | Derrick Rose / Rose
2009 | Blake Griffin / Griffin
2010 | John Wall / Wall
2011 | Kyrie Irving / Kyrie / Irving
2012 | Anthony Davis / AD / Davis
2013 | Anthony Bennett / Bennett
2014 | Andrew Wiggins / Wiggins
2015 | Karl-Anthony Towns / KAT / Towns
2016 | Ben Simmons / Simmons
2017 | Markelle Fultz / Fultz
2018 | Deandre Ayton / Ayton
2019 | Zion Williamson / Zion / Williamson
2020 | Anthony Edwards / Ant / Edwards / Ant-Man
2021 | Cade Cunningham / Cade / Cunningham
2022 | Paolo Banchero / Paolo / Banchero
2023 | Victor Wembanyama / Wembanyama / Wemby
2024 | Zaccharie Risacher / Risacher
2025 | Cooper Flagg / Flagg`)},
{id:'roy',title:'Rookies of the Year',t:600,items:L(`1953 | Don Meineke / Meineke
1954 | Ray Felix / Felix
1955 | Bob Pettit / Pettit
1956 | Maurice Stokes / Stokes
1957 | Tom Heinsohn / Heinsohn
1958 | Woody Sauldsberry / Sauldsberry
1959 | Elgin Baylor / Baylor
1960 | Wilt Chamberlain / Wilt / Chamberlain
1961 | Oscar Robertson / Oscar / Robertson
1962 | Walt Bellamy / Bellamy
1963 | Terry Dischinger / Dischinger
1964 | Jerry Lucas / Lucas
1965 | Willis Reed / Reed
1966 | Rick Barry / Barry
1967 | Dave Bing / Bing
1968 | Earl Monroe / Monroe / Pearl
1969 | Wes Unseld / Unseld
1970 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor / Alcindor
1971 | Dave Cowens / Cowens
1971 | Geoff Petrie / Petrie
1972 | Sidney Wicks / Wicks
1973 | Bob McAdoo / McAdoo
1974 | Ernie DiGregorio / DiGregorio / Ernie D
1975 | Keith Wilkes / Jamaal Wilkes / Wilkes
1976 | Alvan Adams / Adams
1977 | Adrian Dantley / Dantley
1978 | Walter Davis / W Davis / Davis
1979 | Phil Ford / Ford
1980 | Larry Bird / Bird
1981 | Darrell Griffith / Griffith / Dr Dunkenstein
1982 | Buck Williams / Williams
1983 | Terry Cummings / Cummings
1984 | Ralph Sampson / Sampson
1985 | Michael Jordan / Jordan / MJ
1986 | Patrick Ewing / Ewing
1987 | Chuck Person / Person
1988 | Mark Jackson / Jackson
1989 | Mitch Richmond / Richmond
1990 | David Robinson / Robinson / Admiral
1991 | Derrick Coleman / Coleman
1992 | Larry Johnson / L Johnson / Grandmama / Johnson
1993 | Shaquille O'Neal / Shaq / O'Neal / Oneal
1994 | Chris Webber / Webber / C-Webb
1995 | Grant Hill / Hill
1995 | Jason Kidd / Kidd
1996 | Damon Stoudamire / Stoudamire / Mighty Mouse
1997 | Allen Iverson / Iverson / AI
1998 | Tim Duncan / Duncan
1999 | Vince Carter / Carter / Vinsanity
2000 | Elton Brand / Brand
2000 | Steve Francis / Francis
2001 | Mike Miller / Miller
2002 | Pau Gasol / Pau / Gasol
2003 | Amar'e Stoudemire / Amare Stoudemire / Stoudemire / Amare
2004 | LeBron James / LeBron / James
2005 | Emeka Okafor / Okafor
2006 | Chris Paul / CP3 / Paul
2007 | Brandon Roy / Roy
2008 | Kevin Durant / Durant / KD
2009 | Derrick Rose / Rose
2010 | Tyreke Evans / Evans
2011 | Blake Griffin / Griffin
2012 | Kyrie Irving / Kyrie / Irving
2013 | Damian Lillard / Lillard / Dame
2014 | Michael Carter-Williams / Carter-Williams / MCW
2015 | Andrew Wiggins / Wiggins
2016 | Karl-Anthony Towns / KAT / Towns
2017 | Malcolm Brogdon / Brogdon
2018 | Ben Simmons / Simmons
2019 | Luka Doncic / Luka / Doncic / Luka Dončić / Dončić
2020 | Ja Morant / Ja / Morant
2021 | LaMelo Ball / LaMelo / Ball
2022 | Scottie Barnes / Barnes
2023 | Paolo Banchero / Paolo / Banchero
2024 | Victor Wembanyama / Wembanyama / Wemby
2025 | Stephon Castle / Castle`)},
{id:'dpoy',title:'Defensive Players of the Year',t:300,items:L(`Sidney Moncrief / Moncrief
Mark Eaton / Eaton
Alvin Robertson / A Robertson
Michael Cooper / Cooper
Michael Jordan / Jordan / MJ
Dennis Rodman / Rodman / Worm
David Robinson / D Robinson / Robinson / Admiral
Hakeem Olajuwon / Olajuwon / Hakeem
Dikembe Mutombo / Mutombo / Dikembe
Gary Payton / Payton / Glove
Alonzo Mourning / Mourning / Zo
Ben Wallace / Wallace / Big Ben
Ron Artest / Metta World Peace / Artest / World Peace / Metta
Marcus Camby / Camby
Kevin Garnett / Garnett / KG
Dwight Howard / Dwight / Howard
Tyson Chandler / Chandler
Marc Gasol / M Gasol / Gasol
Joakim Noah / Noah
Kawhi Leonard / Kawhi / Leonard
Draymond Green / Draymond / Green
Rudy Gobert / Gobert
Giannis Antetokounmpo / Giannis / Antetokounmpo
Marcus Smart / Smart
Jaren Jackson Jr. / Jaren Jackson / JJJ / Jackson
Victor Wembanyama / Wembanyama / Wemby`)},
{id:'6moy',title:'Sixth Men of the Year',t:360,items:L(`Bobby Jones / Jones
Kevin McHale / McHale
Bill Walton / Walton
Ricky Pierce / Pierce
Roy Tarpley / Tarpley
Eddie Johnson / E Johnson / Johnson
Detlef Schrempf / Schrempf
Clifford Robinson / Cliff Robinson / Robinson / Uncle Cliffy
Dell Curry / D Curry
Anthony Mason / Mason
Toni Kukoc / Kukoc / Toni Kukoč / Kukoč
Danny Manning / Manning
Darrell Armstrong / Armstrong
Rodney Rogers / Rogers
Aaron McKie / McKie
Corliss Williamson / Williamson
Bobby Jackson / Jackson
Antawn Jamison / Jamison
Ben Gordon / B Gordon / Gordon
Mike Miller / Miller
Leandro Barbosa / Barbosa
Manu Ginobili / Ginobili / Manu / Manu Ginóbili / Ginóbili
Jason Terry / Terry / Jet
Jamal Crawford / Crawford
Lamar Odom / Odom
James Harden / Harden
J.R. Smith / JR Smith / Smith
Lou Williams / Lou Will / Williams
Eric Gordon / E Gordon
Montrezl Harrell / Harrell / Trez
Jordan Clarkson / Clarkson
Tyler Herro / Herro
Malcolm Brogdon / Brogdon
Naz Reid / Reid
Payton Pritchard / Pritchard`)},
{id:'scoring',title:'Scoring Champions',t:420,items:L(`Joe Fulks / Fulks
Max Zaslofsky / Zaslofsky
George Mikan / Mikan
Paul Arizin / Arizin
Neil Johnston / Johnston
Bob Pettit / Pettit
Wilt Chamberlain / Wilt / Chamberlain
Rick Barry / Barry
Dave Bing / Bing
Jerry West / West
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor
Nate Archibald / Tiny Archibald / Archibald
Bob McAdoo / McAdoo
Pete Maravich / Pistol Pete / Maravich
George Gervin / Gervin / Iceman
David Thompson / Thompson
Adrian Dantley / Dantley
Bernard King / King
Michael Jordan / Jordan / MJ
Dominique Wilkins / Dominique / Wilkins / Nique
David Robinson / D Robinson / Robinson / Admiral
Shaquille O'Neal / Shaq / O'Neal / Oneal
Allen Iverson / Iverson / AI
Tracy McGrady / McGrady / T-Mac / TMac
Kobe Bryant / Kobe / Bryant
Kevin Durant / Durant / KD
Carmelo Anthony / Carmelo / Melo / Anthony
Russell Westbrook / Westbrook / Russ
James Harden / Harden
Stephen Curry / Steph Curry / Curry / Steph
Bradley Beal / Beal
Joel Embiid / Embiid
Luka Doncic / Luka / Doncic / Luka Dončić / Dončić
Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai`)},
{id:'top30',title:'Career Scoring Leaders',t:360,items:L(`LeBron James / LeBron / James
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Karl Malone / K Malone / Mailman
Kobe Bryant / Kobe / Bryant
Michael Jordan / Jordan / MJ
Dirk Nowitzki / Dirk / Nowitzki
Wilt Chamberlain / Wilt / Chamberlain
Kevin Durant / Durant / KD
Shaquille O'Neal / Shaq / O'Neal / Oneal
Carmelo Anthony / Carmelo / Melo / Anthony
James Harden / Harden
Moses Malone / Moses / M Malone
Elvin Hayes / Hayes
Hakeem Olajuwon / Olajuwon / Hakeem
Oscar Robertson / Oscar / Robertson
Dominique Wilkins / Dominique / Wilkins / Nique
Russell Westbrook / Westbrook / Russ
Tim Duncan / Duncan
Paul Pierce / Pierce
Stephen Curry / Steph Curry / Curry / Steph
John Havlicek / Havlicek / Hondo
Kevin Garnett / Garnett / KG
Vince Carter / Carter
Alex English / English
Reggie Miller / Reggie / Miller
Jerry West / West
Patrick Ewing / Ewing
Ray Allen / Allen
Allen Iverson / Iverson / AI
Charles Barkley / Barkley`)},
{id:'70pt',title:'70-Point Games',t:120,items:L(`Wilt Chamberlain / Wilt / Chamberlain
Kobe Bryant / Kobe / Bryant
David Thompson / Thompson
Elgin Baylor / Baylor
David Robinson / Robinson / Admiral
Devin Booker / Booker / Book
Donovan Mitchell / Mitchell / Spida
Damian Lillard / Lillard / Dame
Luka Doncic / Luka / Doncic / Luka Dončić / Dončić
Joel Embiid / Embiid`)},
{id:'rings',title:'Most Championships (Players)',t:300,items:L(`11 | Bill Russell / Russell
10 | Sam Jones / Jones
8 | John Havlicek / Havlicek / Hondo
8 | Tom Heinsohn / Heinsohn
8 | K.C. Jones / KC Jones
8 | Satch Sanders / Tom Sanders / Sanders
7 | Robert Horry / Horry / Big Shot Bob
7 | Frank Ramsey / Ramsey
7 | Jim Loscutoff / Loscutoff
6 | Bob Cousy / Cousy
6 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
6 | Michael Jordan / Jordan / MJ
6 | Scottie Pippen / Pippen
5 | Larry Siegfried / Siegfried
5 | Don Nelson / Nelson
5 | Magic Johnson / Magic / Earvin Johnson
5 | Michael Cooper / Cooper
5 | Steve Kerr / Kerr
5 | Dennis Rodman / Rodman / Worm
5 | Ron Harper / Harper
5 | Kobe Bryant / Kobe / Bryant
5 | Derek Fisher / Fisher
5 | Tim Duncan / Duncan`)},
{id:'nba50',title:'NBA 50 Greatest (1996)',t:480,items:L(`Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Nate Archibald / Tiny Archibald / Archibald
Paul Arizin / Arizin
Charles Barkley / Barkley
Rick Barry / Barry
Elgin Baylor / Baylor
Dave Bing / Bing
Larry Bird / Bird
Wilt Chamberlain / Wilt / Chamberlain
Bob Cousy / Cousy
Dave Cowens / Cowens
Billy Cunningham / Cunningham
Dave DeBusschere / DeBusschere
Clyde Drexler / Drexler / Glide
Julius Erving / Erving / Dr J / Dr. J
Patrick Ewing / Ewing
Walt Frazier / Frazier / Clyde
George Gervin / Gervin / Iceman
Hal Greer / Greer
John Havlicek / Havlicek / Hondo
Elvin Hayes / Hayes
Magic Johnson / Magic / Earvin Johnson
Sam Jones / Jones
Michael Jordan / Jordan / MJ
Jerry Lucas / Lucas
Karl Malone / K Malone / Mailman
Moses Malone / Moses / M Malone
Pete Maravich / Pistol Pete / Maravich
Kevin McHale / McHale
George Mikan / Mikan
Earl Monroe / Monroe / Pearl
Hakeem Olajuwon / Olajuwon / Hakeem
Shaquille O'Neal / Shaq / O'Neal / Oneal
Robert Parish / Parish / Chief
Bob Pettit / Pettit
Scottie Pippen / Pippen
Willis Reed / Reed
Oscar Robertson / Oscar / Robertson / Big O
David Robinson / D Robinson / Robinson / Admiral
Bill Russell / Russell
Dolph Schayes / Schayes
Bill Sharman / Sharman
John Stockton / Stockton
Isiah Thomas / Isiah / Thomas
Nate Thurmond / Thurmond
Wes Unseld / Unseld
Bill Walton / Walton
Jerry West / West
Lenny Wilkens / Wilkens
James Worthy / Worthy`)},
{id:'nba75',title:'NBA 75th Anniversary Team',t:600,items:L(`Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Ray Allen / Allen
Giannis Antetokounmpo / Giannis / Antetokounmpo
Carmelo Anthony / Carmelo / Melo / Anthony
Nate Archibald / Tiny Archibald / Archibald
Paul Arizin / Arizin
Charles Barkley / Barkley
Rick Barry / Barry
Elgin Baylor / Baylor
Dave Bing / Bing
Larry Bird / Bird
Kobe Bryant / Kobe / Bryant
Wilt Chamberlain / Wilt / Chamberlain
Bob Cousy / Cousy
Dave Cowens / Cowens
Billy Cunningham / Cunningham
Stephen Curry / Steph Curry / Curry / Steph
Anthony Davis / AD / Davis
Dave DeBusschere / DeBusschere
Clyde Drexler / Drexler / Glide
Tim Duncan / Duncan
Kevin Durant / Durant / KD
Julius Erving / Erving / Dr J / Dr. J
Patrick Ewing / Ewing
Walt Frazier / Frazier / Clyde
Kevin Garnett / Garnett / KG
George Gervin / Gervin / Iceman
Hal Greer / Greer
James Harden / Harden
John Havlicek / Havlicek / Hondo
Elvin Hayes / Hayes
Allen Iverson / Iverson / AI
LeBron James / LeBron / James
Magic Johnson / Magic / Earvin Johnson
Sam Jones / Jones
Michael Jordan / Jordan / MJ
Jason Kidd / Kidd
Kawhi Leonard / Kawhi / Leonard
Damian Lillard / Lillard / Dame
Jerry Lucas / Lucas
Karl Malone / K Malone / Mailman
Moses Malone / Moses / M Malone
Pete Maravich / Pistol Pete / Maravich
Bob McAdoo / McAdoo
Kevin McHale / McHale
George Mikan / Mikan
Reggie Miller / Reggie / Miller
Earl Monroe / Monroe / Pearl
Steve Nash / Nash
Dirk Nowitzki / Dirk / Nowitzki
Hakeem Olajuwon / Olajuwon / Hakeem
Shaquille O'Neal / Shaq / O'Neal / Oneal
Robert Parish / Parish / Chief
Chris Paul / CP3 / Paul
Gary Payton / Payton / Glove
Bob Pettit / Pettit
Paul Pierce / Pierce
Scottie Pippen / Pippen
Willis Reed / Reed
Oscar Robertson / Oscar / Robertson / Big O
David Robinson / D Robinson / Robinson / Admiral
Dennis Rodman / Rodman / Worm
Bill Russell / Russell
Dolph Schayes / Schayes
Bill Sharman / Sharman
John Stockton / Stockton
Isiah Thomas / Isiah / Thomas
Nate Thurmond / Thurmond
Wes Unseld / Unseld
Dwyane Wade / Wade
Bill Walton / Walton
Jerry West / West
Russell Westbrook / Westbrook / Russ
Lenny Wilkens / Wilkens
Dominique Wilkins / Dominique / Wilkins / Nique
James Worthy / Worthy`)},
{id:'30ppg',title:'30 PPG Seasons',t:300,items:L(`Wilt Chamberlain / Wilt / Chamberlain
Elgin Baylor / Baylor
Oscar Robertson / Oscar / Robertson / Big O
Bob Pettit / Pettit
Walt Bellamy / Bellamy
Jack Twyman / Twyman
Rick Barry / Barry
Jerry West / West
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor
Nate Archibald / Tiny Archibald / Archibald
Bob McAdoo / McAdoo
Pete Maravich / Pistol Pete / Maravich
George Gervin / Gervin / Iceman
World B. Free / World B Free / Lloyd Free / Free
Adrian Dantley / Dantley
Moses Malone / Moses / M Malone
Bernard King / King
Michael Jordan / Jordan / MJ
Dominique Wilkins / Dominique / Wilkins / Nique
Karl Malone / K Malone / Mailman
Allen Iverson / Iverson / AI
Tracy McGrady / McGrady / T-Mac / TMac
Kobe Bryant / Kobe / Bryant
Dwyane Wade / Wade
LeBron James / LeBron / James
Kevin Durant / Durant / KD
Stephen Curry / Steph Curry / Curry / Steph
Russell Westbrook / Westbrook / Russ
James Harden / Harden
Bradley Beal / Beal
Joel Embiid / Embiid
Luka Doncic / Luka / Doncic / Luka Dončić / Dončić
Damian Lillard / Lillard / Dame
Jayson Tatum / Tatum
Giannis Antetokounmpo / Giannis / Antetokounmpo
Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai`)},
];
try{ JSON.parse(localStorage.getItem('hv_custom')||'[]').forEach(q=>QUIZZES.push(q)); }catch(e){}

