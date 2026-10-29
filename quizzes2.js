// More NBA quizzes (and updated versions of two base quizzes)
['scoring','draft1'].forEach(id=>{ const i=QUIZZES.findIndex(q=>q.id===id); if(i>-1) QUIZZES.splice(i,1); });
[
{id:'scoring',title:'Scoring Champions',t:420,items:L(`Joe Fulks / Fulks
Max Zaslofsky / Zaslofsky
George Mikan / Mikan
Paul Arizin / Arizin
Neil Johnston / Johnston
Bob Pettit / Pettit
George Yardley / Yardley
Wilt Chamberlain / Wilt / Chamberlain
Rick Barry / Barry
Dave Bing / Bing
Elvin Hayes / Hayes
Jerry West / West
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor
Nate Archibald / Tiny Archibald / Archibald
Bob McAdoo / McAdoo
Pete Maravich / Pistol Pete / Maravich
George Gervin / Gervin / Iceman
David Thompson / Thompson
Adrian Dantley / Dantley
Alex English / English
Bernard King / King
Michael Jordan / Jordan / MJ
Dominique Wilkins / Dominique / Wilkins / Nique
David Robinson / D Robinson / Robinson / Admiral
Shaquille O'Neal / Shaq / O'Neal / Oneal
Allen Iverson / Iverson / AI
Tracy McGrady / McGrady / T-Mac / TMac
Kobe Bryant / Kobe / Bryant
Dwyane Wade / Wade
Kevin Durant / Durant / KD
Carmelo Anthony / Carmelo / Melo / Anthony
Russell Westbrook / Westbrook / Russ
James Harden / Harden
Stephen Curry / Steph Curry / Curry / Steph
Bradley Beal / Beal
Joel Embiid / Embiid
Luka Doncic / Luka / Doncic / Luka Dončić / Dončić
Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai`)},,
{id:'draft1',title:'#1 Overall Picks',t:720,items:L(`1966 | Cazzie Russell / Russell
1967 | Jimmy Walker / Walker
1968 | Elvin Hayes / Hayes
1969 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor / Alcindor
1970 | Bob Lanier / Lanier
1971 | Austin Carr / Carr
1972 | LaRue Martin / Martin
1973 | Doug Collins / Collins
1974 | Bill Walton / Walton
1975 | David Thompson / Thompson
1976 | John Lucas / Lucas
1977 | Kent Benson / Benson
1978 | Mychal Thompson / M Thompson
1979 | Magic Johnson / Magic / Earvin Johnson
1980 | Joe Barry Carroll / Carroll
1981 | Mark Aguirre / Aguirre
1982 | James Worthy / Worthy
1983 | Ralph Sampson / Sampson
1984 | Hakeem Olajuwon / Olajuwon / Hakeem / Akeem Olajuwon
1985 | Patrick Ewing / Ewing
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
2025 | Cooper Flagg / Flagg`)},,
{id:'scoring-year',title:'Scoring Champions by Year',t:720,items:L(`1947 | Joe Fulks / Fulks
1948 | Max Zaslofsky / Zaslofsky
1949 | George Mikan / Mikan
1950 | George Mikan / Mikan
1951 | George Mikan / Mikan
1952 | Paul Arizin / Arizin
1953 | Neil Johnston / Johnston
1954 | Neil Johnston / Johnston
1955 | Neil Johnston / Johnston
1956 | Bob Pettit / Pettit
1957 | Paul Arizin / Arizin
1958 | George Yardley / Yardley
1959 | Bob Pettit / Pettit
1960 | Wilt Chamberlain / Wilt / Chamberlain
1961 | Wilt Chamberlain / Wilt / Chamberlain
1962 | Wilt Chamberlain / Wilt / Chamberlain
1963 | Wilt Chamberlain / Wilt / Chamberlain
1964 | Wilt Chamberlain / Wilt / Chamberlain
1965 | Wilt Chamberlain / Wilt / Chamberlain
1966 | Wilt Chamberlain / Wilt / Chamberlain
1967 | Rick Barry / Barry
1968 | Dave Bing / Bing
1969 | Elvin Hayes / Hayes
1970 | Jerry West / West
1971 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar / Lew Alcindor / Alcindor
1972 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
1973 | Nate Archibald / Tiny Archibald / Archibald
1974 | Bob McAdoo / McAdoo
1975 | Bob McAdoo / McAdoo
1976 | Bob McAdoo / McAdoo
1977 | Pete Maravich / Pistol Pete / Maravich
1978 | George Gervin / Gervin / Iceman
1979 | George Gervin / Gervin / Iceman
1980 | George Gervin / Gervin / Iceman
1981 | Adrian Dantley / Dantley
1982 | George Gervin / Gervin / Iceman
1983 | Alex English / English
1984 | Adrian Dantley / Dantley
1985 | Bernard King / King
1986 | Dominique Wilkins / Dominique / Wilkins / Nique
1987 | Michael Jordan / Jordan / MJ
1988 | Michael Jordan / Jordan / MJ
1989 | Michael Jordan / Jordan / MJ
1990 | Michael Jordan / Jordan / MJ
1991 | Michael Jordan / Jordan / MJ
1992 | Michael Jordan / Jordan / MJ
1993 | Michael Jordan / Jordan / MJ
1994 | David Robinson / Robinson / Admiral
1995 | Shaquille O'Neal / Shaq / O'Neal / Oneal
1996 | Michael Jordan / Jordan / MJ
1997 | Michael Jordan / Jordan / MJ
1998 | Michael Jordan / Jordan / MJ
1999 | Allen Iverson / Iverson / AI
2000 | Shaquille O'Neal / Shaq / O'Neal / Oneal
2001 | Allen Iverson / Iverson / AI
2002 | Allen Iverson / Iverson / AI
2003 | Tracy McGrady / McGrady / T-Mac / TMac
2004 | Tracy McGrady / McGrady / T-Mac / TMac
2005 | Allen Iverson / Iverson / AI
2006 | Kobe Bryant / Kobe / Bryant
2007 | Kobe Bryant / Kobe / Bryant
2008 | LeBron James / LeBron / James
2009 | Dwyane Wade / Wade
2010 | Kevin Durant / Durant / KD
2011 | Kevin Durant / Durant / KD
2012 | Kevin Durant / Durant / KD
2013 | Carmelo Anthony / Carmelo / Melo / Anthony
2014 | Kevin Durant / Durant / KD
2015 | Russell Westbrook / Westbrook / Russ
2016 | Stephen Curry / Steph Curry / Curry / Steph
2017 | Russell Westbrook / Westbrook / Russ
2018 | James Harden / Harden
2019 | James Harden / Harden
2020 | James Harden / Harden
2021 | Stephen Curry / Steph Curry / Curry / Steph
2022 | Joel Embiid / Embiid
2023 | Joel Embiid / Embiid
2024 | Luka Doncic / Luka / Doncic / Luka Dončić / Dončić
2025 | Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai`)},
{id:'runnerup',title:'Finals Runners-Up by Year',t:720,items:L(`1947 | Chicago Stags / Stags
1948 | Philadelphia Warriors / Warriors
1949 | Washington Capitols / Capitols
1950 | Syracuse Nationals / Nationals / Nats
1951 | New York Knicks / Knicks
1952 | New York Knicks / Knicks
1953 | New York Knicks / Knicks
1954 | Syracuse Nationals / Nationals / Nats
1955 | Fort Wayne Pistons / Pistons
1956 | Fort Wayne Pistons / Pistons
1957 | St. Louis Hawks / St Louis Hawks / Hawks
1958 | Boston Celtics / Celtics
1959 | Minneapolis Lakers / Lakers
1960 | St. Louis Hawks / St Louis Hawks / Hawks
1961 | St. Louis Hawks / St Louis Hawks / Hawks
1962 | Los Angeles Lakers / Lakers
1963 | Los Angeles Lakers / Lakers
1964 | San Francisco Warriors / Warriors
1965 | Los Angeles Lakers / Lakers
1966 | Los Angeles Lakers / Lakers
1967 | San Francisco Warriors / Warriors
1968 | Los Angeles Lakers / Lakers
1969 | Los Angeles Lakers / Lakers
1970 | Los Angeles Lakers / Lakers
1971 | Baltimore Bullets / Bullets
1972 | New York Knicks / Knicks
1973 | Los Angeles Lakers / Lakers
1974 | Milwaukee Bucks / Bucks
1975 | Washington Bullets / Bullets
1976 | Phoenix Suns / Suns
1977 | Philadelphia 76ers / 76ers / Sixers
1978 | Seattle SuperSonics / SuperSonics / Sonics
1979 | Washington Bullets / Bullets
1980 | Philadelphia 76ers / 76ers / Sixers
1981 | Houston Rockets / Rockets
1982 | Philadelphia 76ers / 76ers / Sixers
1983 | Los Angeles Lakers / Lakers
1984 | Los Angeles Lakers / Lakers
1985 | Boston Celtics / Celtics
1986 | Houston Rockets / Rockets
1987 | Boston Celtics / Celtics
1988 | Detroit Pistons / Pistons
1989 | Los Angeles Lakers / Lakers
1990 | Portland Trail Blazers / Trail Blazers / Blazers
1991 | Los Angeles Lakers / Lakers
1992 | Portland Trail Blazers / Trail Blazers / Blazers
1993 | Phoenix Suns / Suns
1994 | New York Knicks / Knicks
1995 | Orlando Magic / Magic
1996 | Seattle SuperSonics / SuperSonics / Sonics
1997 | Utah Jazz / Jazz
1998 | Utah Jazz / Jazz
1999 | New York Knicks / Knicks
2000 | Indiana Pacers / Pacers
2001 | Philadelphia 76ers / 76ers / Sixers
2002 | New Jersey Nets / Nets
2003 | New Jersey Nets / Nets
2004 | Los Angeles Lakers / Lakers
2005 | Detroit Pistons / Pistons
2006 | Dallas Mavericks / Mavericks / Mavs
2007 | Cleveland Cavaliers / Cavaliers / Cavs
2008 | Los Angeles Lakers / Lakers
2009 | Orlando Magic / Magic
2010 | Boston Celtics / Celtics
2011 | Miami Heat / Heat
2012 | Oklahoma City Thunder / Thunder / OKC
2013 | San Antonio Spurs / Spurs
2014 | Miami Heat / Heat
2015 | Cleveland Cavaliers / Cavaliers / Cavs
2016 | Golden State Warriors / Warriors
2017 | Cleveland Cavaliers / Cavaliers / Cavs
2018 | Cleveland Cavaliers / Cavaliers / Cavs
2019 | Golden State Warriors / Warriors
2020 | Miami Heat / Heat
2021 | Phoenix Suns / Suns
2022 | Boston Celtics / Celtics
2023 | Miami Heat / Heat
2024 | Dallas Mavericks / Mavericks / Mavs
2025 | Indiana Pacers / Pacers`)},
{id:'21k',title:'21,000-Point Club',t:480,items:L(`LeBron James / LeBron / James
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
Oscar Robertson / Oscar / Robertson / Big O
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
Charles Barkley / Barkley
Robert Parish / Parish / Chief
DeMar DeRozan / DeRozan
Dwyane Wade / Wade
Adrian Dantley / Dantley
Elgin Baylor / Baylor
Chris Paul / CP3 / Paul
Clyde Drexler / Drexler / Glide
Gary Payton / Payton / Glove
Larry Bird / Bird
Hal Greer / Greer`)},
{id:'30k',title:'30,000-Point Club',t:45,items:L(`LeBron James / LeBron / James
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Karl Malone / K Malone / Mailman
Kobe Bryant / Kobe / Bryant
Michael Jordan / Jordan / MJ
Dirk Nowitzki / Dirk / Nowitzki
Wilt Chamberlain / Wilt / Chamberlain
Kevin Durant / Durant / KD`)},
{id:'60pt',title:'60-Point Games',t:360,items:L(`Wilt Chamberlain / Wilt / Chamberlain
Kobe Bryant / Kobe / Bryant
Luka Doncic / Luka / Doncic / Luka Dončić / Dončić
David Thompson / Thompson
Elgin Baylor / Baylor
David Robinson / Robinson / Admiral
Damian Lillard / Lillard / Dame
Donovan Mitchell / Mitchell / Spida
Devin Booker / Booker / Book
Joel Embiid / Embiid
Pete Maravich / Pistol Pete / Maravich
Michael Jordan / Jordan / MJ
Rick Barry / Barry
Giannis Antetokounmpo / Giannis / Antetokounmpo
Jerry West / West
Joe Fulks / Fulks
George Gervin / Gervin / Iceman
Stephen Curry / Steph Curry / Curry / Steph
Carmelo Anthony / Carmelo / Melo / Anthony
Tracy McGrady / McGrady / T-Mac / TMac
George Mikan / Mikan
Karl Malone / K Malone / Mailman
Shaquille O'Neal / Shaq / O'Neal / Oneal
LeBron James / LeBron / James
James Harden / Harden
Jalen Brunson / Brunson
Larry Bird / Bird
Tom Chambers / Chambers
Klay Thompson / Klay / K Thompson
Gilbert Arenas / Arenas / Agent Zero
Allen Iverson / Iverson / AI
Kemba Walker / Kemba / Walker
Bradley Beal / Beal
Kyrie Irving / Kyrie / Irving
Jayson Tatum / Tatum
Bernard King / King`)},
{id:'steals',title:'All-Time Steals Leaders',t:150,items:L(`John Stockton / Stockton
Chris Paul / CP3 / Paul
Jason Kidd / Kidd
Michael Jordan / Jordan / MJ
Gary Payton / Payton / Glove
Maurice Cheeks / Mo Cheeks / Cheeks
Scottie Pippen / Pippen
LeBron James / LeBron / James
Clyde Drexler / Drexler / Glide
Hakeem Olajuwon / Olajuwon / Hakeem`)},
{id:'blocks',title:'All-Time Blocks Leaders',t:150,items:L(`Hakeem Olajuwon / Olajuwon / Hakeem
Dikembe Mutombo / Mutombo / Dikembe
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Mark Eaton / Eaton
Tim Duncan / Duncan
David Robinson / Robinson / Admiral
Patrick Ewing / Ewing
Shaquille O'Neal / Shaq / O'Neal / Oneal
Tree Rollins / Wayne Rollins / Rollins
Robert Parish / Parish / Chief`)},
{id:'allstar13',title:'13+ All-Star Selections',t:180,items:L(`LeBron James / LeBron / James
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Kobe Bryant / Kobe / Bryant
Tim Duncan / Duncan
Kevin Garnett / Garnett / KG
Shaquille O'Neal / Shaq / O'Neal / Oneal
Kevin Durant / Durant / KD
Jerry West / West
Karl Malone / K Malone / Mailman
Dirk Nowitzki / Dirk / Nowitzki
Michael Jordan / Jordan / MJ
Wilt Chamberlain / Wilt / Chamberlain
John Havlicek / Havlicek / Hondo
Bob Cousy / Cousy
Moses Malone / Moses / M Malone`)},
{id:'games',title:'Most Games Played',t:150,items:L(`Robert Parish / Parish / Chief
LeBron James / LeBron / James
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Vince Carter / Carter
Dirk Nowitzki / Dirk / Nowitzki
John Stockton / Stockton
Karl Malone / K Malone / Mailman
Kevin Garnett / Garnett / KG
Kevin Willis / Willis
Jason Kidd / Kidd`)},
{id:'mip',title:'Most Improved Players',t:480,items:L(`1986 | Alvin Robertson / Robertson
1987 | Dale Ellis / Ellis
1988 | Kevin Duckworth / Duckworth
1989 | Kevin Johnson / KJ / K Johnson
1990 | Rony Seikaly / Seikaly
1991 | Scott Skiles / Skiles
1992 | Pervis Ellison / Ellison
1993 | Mahmoud Abdul-Rauf / Abdul-Rauf / Chris Jackson
1994 | Don MacLean / MacLean
1995 | Dana Barros / Barros
1996 | Gheorghe Muresan / Muresan / Mureșan
1997 | Isaac Austin / Austin
1998 | Alan Henderson / Henderson
1999 | Darrell Armstrong / Armstrong
2000 | Jalen Rose / Rose
2001 | Tracy McGrady / McGrady / T-Mac / TMac
2002 | Jermaine O'Neal / Jermaine / J O'Neal
2003 | Gilbert Arenas / Arenas / Agent Zero
2004 | Zach Randolph / Randolph / Z-Bo
2005 | Bobby Simmons / Simmons
2006 | Boris Diaw / Diaw
2007 | Monta Ellis / Monta / Ellis
2008 | Hedo Turkoglu / Turkoglu / Hedo
2009 | Danny Granger / Granger
2010 | Aaron Brooks / Brooks
2011 | Kevin Love / Love
2012 | Ryan Anderson / Anderson
2013 | Paul George / PG / PG13 / George
2014 | Goran Dragic / Dragic / Dragić
2015 | Jimmy Butler / Butler
2016 | CJ McCollum / McCollum / C.J. McCollum
2017 | Giannis Antetokounmpo / Giannis / Antetokounmpo
2018 | Victor Oladipo / Oladipo
2019 | Pascal Siakam / Siakam
2020 | Brandon Ingram / Ingram
2021 | Julius Randle / Randle
2022 | Ja Morant / Ja / Morant
2023 | Lauri Markkanen / Markkanen
2024 | Tyrese Maxey / Maxey
2025 | Dyson Daniels / Daniels`)},
{id:'divisions',title:'Teams by Division',t:360,items:L(`Atlantic | Boston Celtics / Celtics
Atlantic | Brooklyn Nets / Nets
Atlantic | New York Knicks / Knicks
Atlantic | Philadelphia 76ers / 76ers / Sixers
Atlantic | Toronto Raptors / Raptors
Central | Chicago Bulls / Bulls
Central | Cleveland Cavaliers / Cavaliers / Cavs
Central | Detroit Pistons / Pistons
Central | Indiana Pacers / Pacers
Central | Milwaukee Bucks / Bucks
Southeast | Atlanta Hawks / Hawks
Southeast | Charlotte Hornets / Hornets
Southeast | Miami Heat / Heat
Southeast | Orlando Magic / Magic
Southeast | Washington Wizards / Wizards
Northwest | Denver Nuggets / Nuggets
Northwest | Minnesota Timberwolves / Timberwolves / Wolves
Northwest | Oklahoma City Thunder / Thunder / OKC
Northwest | Portland Trail Blazers / Trail Blazers / Blazers
Northwest | Utah Jazz / Jazz
Pacific | Golden State Warriors / Warriors
Pacific | Los Angeles Clippers / Clippers
Pacific | Los Angeles Lakers / Lakers
Pacific | Phoenix Suns / Suns
Pacific | Sacramento Kings / Kings
Southwest | Dallas Mavericks / Mavericks / Mavs
Southwest | Houston Rockets / Rockets
Southwest | Memphis Grizzlies / Grizzlies
Southwest | New Orleans Pelicans / Pelicans
Southwest | San Antonio Spurs / Spurs`)},
{id:'former',title:'Former NBA Team Names',t:300,items:L(`Seattle SuperSonics / SuperSonics / Sonics
Vancouver Grizzlies
New Jersey Nets
Charlotte Bobcats / Bobcats
New Orleans Hornets
New Orleans/Oklahoma City Hornets / Oklahoma City Hornets
Washington Bullets / Baltimore Bullets / Bullets
Kansas City Kings / Kansas City-Omaha Kings
Cincinnati Royals / Rochester Royals / Royals
San Diego Clippers / Buffalo Braves / Braves
Minneapolis Lakers
Philadelphia Warriors / San Francisco Warriors
St. Louis Hawks / St Louis Hawks / Milwaukee Hawks / Tri-Cities Blackhawks
Syracuse Nationals / Nationals / Nats
Fort Wayne Pistons
Chicago Zephyrs / Chicago Packers / Zephyrs / Packers
San Diego Rockets
New Orleans Jazz
Dallas Chaparrals / Texas Chaparrals / Chaparrals
Capital Bullets`)},
{id:'assists',title:'All-Time Assists Leaders',t:240,items:L(`John Stockton / Stockton
Chris Paul / CP3 / Paul
Jason Kidd / Kidd
LeBron James / LeBron / James
Steve Nash / Nash
Mark Jackson / Jackson
Magic Johnson / Magic / Earvin Johnson
Oscar Robertson / Oscar / Robertson / Big O
Russell Westbrook / Westbrook / Russ
Isiah Thomas / Isiah / Thomas
Gary Payton / Payton / Glove
Andre Miller / Miller
Rod Strickland / Strickland
Rajon Rondo / Rondo
Maurice Cheeks / Mo Cheeks / Cheeks`)},
{id:'rebounds',title:'All-Time Rebounding Leaders',t:240,items:L(`Wilt Chamberlain / Wilt / Chamberlain
Bill Russell / Russell
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Elvin Hayes / Hayes
Moses Malone / Moses / M Malone
Tim Duncan / Duncan
Karl Malone / K Malone / Mailman
Robert Parish / Parish / Chief
Kevin Garnett / Garnett / KG
Dwight Howard / Dwight / Howard
Nate Thurmond / Thurmond
Walt Bellamy / Bellamy
Wes Unseld / Unseld
Hakeem Olajuwon / Olajuwon / Hakeem
Buck Williams / Williams`)},
{id:'threes',title:'All-Time 3-Point Leaders',t:180,items:L(`Stephen Curry / Steph Curry / Curry / Steph
James Harden / Harden
Ray Allen / Allen
Damian Lillard / Lillard / Dame
Klay Thompson / Klay / Thompson
LeBron James / LeBron / James
Reggie Miller / Reggie / Miller
Paul George / PG / PG13 / George
Kyle Korver / Korver
Vince Carter / Carter`)},
{id:'tripdub',title:'Triple-Double Leaders',t:180,items:L(`Russell Westbrook / Westbrook / Russ
Oscar Robertson / Oscar / Robertson / Big O
Nikola Jokic / Jokic / Nikola Jokić / Jokić / Joker
Magic Johnson / Magic / Earvin Johnson
Jason Kidd / Kidd
LeBron James / LeBron / James
Wilt Chamberlain / Wilt / Chamberlain
Luka Doncic / Luka / Doncic / Luka Dončić / Dončić
James Harden / Harden
Larry Bird / Bird`)},
{id:'states',title:'Teams by State / Province',t:360,items:L(`Georgia | Atlanta Hawks / Hawks
Massachusetts | Boston Celtics / Celtics
New York | Brooklyn Nets / Nets
New York | New York Knicks / Knicks
North Carolina | Charlotte Hornets / Hornets
Illinois | Chicago Bulls / Bulls
Ohio | Cleveland Cavaliers / Cavaliers / Cavs
Texas | Dallas Mavericks / Mavericks / Mavs
Texas | Houston Rockets / Rockets
Texas | San Antonio Spurs / Spurs
Colorado | Denver Nuggets / Nuggets
Michigan | Detroit Pistons / Pistons
California | Golden State Warriors / Warriors
California | Los Angeles Clippers / Clippers
California | Los Angeles Lakers / Lakers
California | Sacramento Kings / Kings
Indiana | Indiana Pacers / Pacers
Tennessee | Memphis Grizzlies / Grizzlies
Florida | Miami Heat / Heat
Florida | Orlando Magic / Magic
Wisconsin | Milwaukee Bucks / Bucks
Minnesota | Minnesota Timberwolves / Timberwolves / Wolves
Louisiana | New Orleans Pelicans / Pelicans
Oklahoma | Oklahoma City Thunder / Thunder / OKC
Pennsylvania | Philadelphia 76ers / 76ers / Sixers
Arizona | Phoenix Suns / Suns
Oregon | Portland Trail Blazers / Trail Blazers / Blazers
Ontario | Toronto Raptors / Raptors
Utah | Utah Jazz / Jazz
Washington DC | Washington Wizards / Wizards`)},
{id:'expansion',title:'Expansion Teams Since 1980',t:90,items:L(`1980 | Dallas Mavericks / Mavericks / Mavs
1988 | Charlotte Hornets / Hornets
1988 | Miami Heat / Heat
1989 | Orlando Magic / Magic
1989 | Minnesota Timberwolves / Timberwolves / Wolves
1995 | Toronto Raptors / Raptors
1995 | Vancouver Grizzlies / Grizzlies / Memphis Grizzlies
2004 | Charlotte Bobcats / Bobcats`)},
].forEach(q=>QUIZZES.push(q));
