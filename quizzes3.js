// Descriptions + categories for every quiz, plus table-layout quizzes.
const META={
 teams:{cat:'Teams',desc:'Can you name all 30 NBA teams?'},
 teams60:{cat:'Teams',desc:'Can you name all 30 NBA teams in 60 seconds?'},
 'not-s':{cat:'Teams',desc:"Can you name the NBA teams whose names don't end in 'S'?"},
 cities:{cat:'Teams',desc:'Can you name every city or metro with an NBA team?'},
 arenas:{cat:'Teams',desc:'Can you name the current home arena of each NBA team?'},
 champs:{cat:'Champions',desc:'Can you name the NBA champion for every season (1947–2025)?'},
 'champ-franchises':{cat:'Champions',desc:'Can you name every franchise that has won an NBA title?'},
 'mvp-year':{cat:'Awards',desc:'Can you name the NBA MVP for each season (1956–2025)?'},
 mvp:{cat:'Awards',desc:'Can you name every player who has won the NBA MVP award?'},
 'multi-mvp':{cat:'Awards',desc:'Can you name the players who have won the MVP award more than once? (number of MVPs given)'},
 'fmvp-year':{cat:'Awards',desc:'Can you name the NBA Finals MVP for each year (1969–2025)?'},
 fmvp:{cat:'Awards',desc:'Can you name every player who has won Finals MVP?'},
 'asg-mvp':{cat:'Awards',desc:'Can you name every NBA All-Star Game MVP?'},
 draft1:{cat:'Draft',desc:'Can you name the #1 overall pick of every NBA Draft (1966–2025)?'},
 roy:{cat:'Awards',desc:'Can you name every NBA Rookie of the Year (1953–2025)?'},
 dpoy:{cat:'Awards',desc:'Can you name every NBA Defensive Player of the Year?'},
 '6moy':{cat:'Awards',desc:'Can you name every NBA Sixth Man of the Year?'},
 scoring:{cat:'Records',desc:'Can you name every player who has led the NBA in scoring for a season?'},
 'scoring-year':{cat:'Records',desc:'Can you name the NBA scoring champion for each season (1947–2025)?'},
 top30:{cat:'Records',desc:'Can you name the top 30 scorers in NBA history (regular season)?'},
 '21k':{cat:'Records',desc:'Can you name every player with 21,000+ career regular-season points?'},
 '30k':{cat:'Records',desc:'Can you name every player with 30,000+ career regular-season points?'},
 '70pt':{cat:'Records',desc:'Can you name every player who has scored 70+ points in an NBA game?'},
 '60pt':{cat:'Records',desc:'Can you name every player who has scored 60+ points in an NBA game?'},
 rings:{cat:'Champions',desc:'Can you name every player with 5 or more NBA championships? (ring count given)'},
 nba50:{cat:'Lists',desc:"Can you name the NBA's 50 Greatest Players, chosen in 1996?"},
 nba75:{cat:'Lists',desc:'Can you name all 76 players on the NBA 75th Anniversary Team?'},
 '30ppg':{cat:'Records',desc:'Can you name every player who has averaged 30+ points per game in a season?'},
 runnerup:{cat:'Champions',desc:'Can you name the team that LOST the NBA Finals each year (1947–2025)?'},
 steals:{cat:'Records',desc:'Can you name the top 10 in career steals?'},
 blocks:{cat:'Records',desc:'Can you name the top 10 in career blocks?'},
 allstar13:{cat:'Lists',desc:'Can you name every player with 13 or more All-Star selections?'},
 games:{cat:'Records',desc:'Can you name the top 10 in career games played?'},
 mip:{cat:'Awards',desc:'Can you name every NBA Most Improved Player (1986–2025)?'},
 divisions:{cat:'Teams',desc:'Can you name the five teams in each NBA division?'},
 former:{cat:'Teams',desc:'Can you name these former NBA team names (relocated or renamed franchises)?'},
 assists:{cat:'Records',desc:'Can you name the top 15 in career assists?'},
 rebounds:{cat:'Records',desc:'Can you name the top 15 in career rebounds?'},
 threes:{cat:'Records',desc:'Can you name the top 10 in career three-pointers made?'},
 tripdub:{cat:'Records',desc:'Can you name the top 10 in career triple-doubles?'},
 states:{cat:'Teams',desc:'Can you name the NBA team(s) in each state or province?'},
 expansion:{cat:'Teams',desc:'Can you name the NBA expansion teams since 1980? (year given)'},
};
// Shared answer strings
const A={
 okc:'Oklahoma City Thunder / Thunder / OKC', bos:'Boston Celtics / Celtics', den:'Denver Nuggets / Nuggets', gsw:'Golden State Warriors / Warriors', mil:'Milwaukee Bucks / Bucks', lal:'Los Angeles Lakers / Lakers', tor:'Toronto Raptors / Raptors', cle:'Cleveland Cavaliers / Cavaliers / Cavs', sas:'San Antonio Spurs / Spurs', mia:'Miami Heat / Heat', dal:'Dallas Mavericks / Mavericks / Mavs', det:'Detroit Pistons / Pistons', chi:'Chicago Bulls / Bulls', hou:'Houston Rockets / Rockets', phi:'Philadelphia 76ers / 76ers / Sixers',
 sga:'Shai Gilgeous-Alexander / SGA / Gilgeous-Alexander / Shai', jokic:'Nikola Jokic / Jokic / Nikola Jokić / Jokić / Joker', embiid:'Joel Embiid / Embiid', giannis:'Giannis Antetokounmpo / Giannis / Antetokounmpo', harden:'James Harden / Harden', russ:'Russell Westbrook / Westbrook / Russ', curry:'Stephen Curry / Steph Curry / Curry / Steph', kd:'Kevin Durant / Durant / KD', lbj:'LeBron James / LeBron / James', rose:'Derrick Rose / Rose', kobe:'Kobe Bryant / Kobe / Bryant', dirk:'Dirk Nowitzki / Dirk / Nowitzki', nash:'Steve Nash / Nash', kg:'Kevin Garnett / Garnett / KG', duncan:'Tim Duncan / Duncan', ai:'Allen Iverson / Iverson / AI', shaq:"Shaquille O'Neal / Shaq / O'Neal / Oneal", kmalone:'Karl Malone / K Malone / Mailman', mj:'Michael Jordan / Jordan / MJ', drob:'David Robinson / Robinson / Admiral', hakeem:'Hakeem Olajuwon / Olajuwon / Hakeem', barkley:'Charles Barkley / Barkley', magic:'Magic Johnson / Magic / Earvin Johnson', bird:'Larry Bird / Bird', kawhi:'Kawhi Leonard / Kawhi / Leonard', iggy:'Andre Iguodala / Iguodala / Iggy', jbrown:'Jaylen Brown / Brown', parker:'Tony Parker / Parker', wade:'Dwyane Wade / Wade', billups:'Chauncey Billups / Billups', pierce:'Paul Pierce / Pierce', isiah:'Isiah Thomas / Isiah / Thomas', dumars:'Joe Dumars / Dumars', worthy:'James Worthy / Worthy', kareem:'Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar', moses:'Moses Malone / Moses / M Malone', luka:'Luka Doncic / Luka / Doncic / Luka Dončić / Dončić', melo:'Carmelo Anthony / Carmelo / Melo / Anthony', tmac:'Tracy McGrady / McGrady / T-Mac / TMac', nique:'Dominique Wilkins / Dominique / Wilkins / Nique', bking:'Bernard King / King', dantley:'Adrian Dantley / Dantley', gervin:'George Gervin / Gervin / Iceman', english:'Alex English / English', beal:'Bradley Beal / Beal',
};
const TABLES=[
{id:'awards-table',layout:'table',cat:'Tables',title:'NBA Awards by Year',t:900,desc:'Can you fill in the champion, MVP, Finals MVP, scoring leader, Rookie of the Year and DPOY for every season since 1985? Typing a name fills every cell it belongs in.',
 cols:['Champion','MVP','Finals MVP','Scoring Leader','Rookie of the Year','DPOY'],
 rows:[
 ['2025',A.okc,A.sga,A.sga,A.sga,'Stephon Castle / Castle','Evan Mobley / Mobley'],
 ['2024',A.bos,A.jokic,A.jbrown,A.luka,'Victor Wembanyama / Wembanyama / Wemby','Rudy Gobert / Gobert'],
 ['2023',A.den,A.embiid,A.jokic,A.embiid,'Paolo Banchero / Paolo / Banchero','Jaren Jackson Jr. / Jaren Jackson / JJJ / Jackson'],
 ['2022',A.gsw,A.jokic,A.curry,A.embiid,'Scottie Barnes / Barnes','Marcus Smart / Smart'],
 ['2021',A.mil,A.jokic,A.giannis,A.curry,'LaMelo Ball / LaMelo / Ball','Rudy Gobert / Gobert'],
 ['2020',A.lal,A.giannis,A.lbj,A.harden,'Ja Morant / Ja / Morant',A.giannis],
 ['2019',A.tor,A.giannis,A.kawhi,A.harden,A.luka,'Rudy Gobert / Gobert'],
 ['2018',A.gsw,A.harden,A.kd,A.harden,'Ben Simmons / Simmons','Rudy Gobert / Gobert'],
 ['2017',A.gsw,A.russ,A.kd,A.russ,'Malcolm Brogdon / Brogdon','Draymond Green / Draymond / Green'],
 ['2016',A.cle,A.curry,A.lbj,A.curry,'Karl-Anthony Towns / KAT / Towns',A.kawhi],
 ['2015',A.gsw,A.curry,A.iggy,A.russ,'Andrew Wiggins / Wiggins',A.kawhi],
 ['2014',A.sas,A.kd,A.kawhi,A.kd,'Michael Carter-Williams / Carter-Williams / MCW','Joakim Noah / Noah'],
 ['2013',A.mia,A.lbj,A.lbj,A.melo,'Damian Lillard / Lillard / Dame','Marc Gasol / M Gasol / Gasol'],
 ['2012',A.mia,A.lbj,A.lbj,A.kd,'Kyrie Irving / Kyrie / Irving','Tyson Chandler / Chandler'],
 ['2011',A.dal,A.rose,A.dirk,A.kd,'Blake Griffin / Griffin','Dwight Howard / Dwight / Howard'],
 ['2010',A.lal,A.lbj,A.kobe,A.kd,'Tyreke Evans / Evans','Dwight Howard / Dwight / Howard'],
 ['2009',A.lal,A.lbj,A.kobe,A.wade,A.rose,'Dwight Howard / Dwight / Howard'],
 ['2008',A.bos,A.kobe,A.pierce,A.lbj,A.kd,A.kg],
 ['2007',A.sas,A.dirk,A.parker,A.kobe,'Brandon Roy / Roy','Marcus Camby / Camby'],
 ['2006',A.mia,A.nash,A.wade,A.kobe,'Chris Paul / CP3 / Paul','Ben Wallace / Wallace / Big Ben'],
 ['2005',A.sas,A.nash,A.duncan,A.ai,'Emeka Okafor / Okafor','Ben Wallace / Wallace / Big Ben'],
 ['2004',A.det,A.kg,A.billups,A.tmac,A.lbj,'Ron Artest / Metta World Peace / Artest / World Peace / Metta'],
 ['2003',A.sas,A.duncan,A.duncan,A.tmac,"Amar'e Stoudemire / Amare Stoudemire / Stoudemire / Amare",'Ben Wallace / Wallace / Big Ben'],
 ['2002',A.lal,A.duncan,A.shaq,A.ai,'Pau Gasol / Pau / Gasol','Ben Wallace / Wallace / Big Ben'],
 ['2001',A.lal,A.ai,A.shaq,A.ai,'Mike Miller / Miller','Dikembe Mutombo / Mutombo / Dikembe'],
 ['2000',A.lal,A.shaq,A.shaq,A.shaq,'Elton Brand / Brand / Steve Francis / Francis','Alonzo Mourning / Mourning / Zo'],
 ['1999',A.sas,A.kmalone,A.duncan,A.ai,'Vince Carter / Carter / Vinsanity','Alonzo Mourning / Mourning / Zo'],
 ['1998',A.chi,A.mj,A.mj,A.mj,A.duncan,'Dikembe Mutombo / Mutombo / Dikembe'],
 ['1997',A.chi,A.kmalone,A.mj,A.mj,A.ai,'Dikembe Mutombo / Mutombo / Dikembe'],
 ['1996',A.chi,A.mj,A.mj,A.mj,'Damon Stoudamire / Stoudamire / Mighty Mouse','Gary Payton / Payton / Glove'],
 ['1995',A.hou,A.drob,A.hakeem,A.shaq,'Grant Hill / Hill / Jason Kidd / Kidd','Dikembe Mutombo / Mutombo / Dikembe'],
 ['1994',A.hou,A.hakeem,A.hakeem,A.drob,'Chris Webber / Webber / C-Webb',A.hakeem],
 ['1993',A.chi,A.barkley,A.mj,A.mj,A.shaq,A.hakeem],
 ['1992',A.chi,A.mj,A.mj,A.mj,'Larry Johnson / L Johnson / Grandmama / Johnson',A.drob],
 ['1991',A.chi,A.mj,A.mj,A.mj,'Derrick Coleman / Coleman','Dennis Rodman / Rodman / Worm'],
 ['1990',A.det,A.magic,A.isiah,A.mj,A.drob,'Dennis Rodman / Rodman / Worm'],
 ['1989',A.det,A.magic,A.dumars,A.mj,'Mitch Richmond / Richmond','Mark Eaton / Eaton'],
 ['1988',A.lal,A.mj,A.worthy,A.mj,'Mark Jackson / Jackson',A.mj],
 ['1987',A.lal,A.magic,A.magic,A.mj,'Chuck Person / Person','Michael Cooper / Cooper'],
 ['1986',A.bos,A.bird,A.bird,A.nique,'Patrick Ewing / Ewing','Alvin Robertson / A Robertson / Robertson'],
 ['1985',A.lal,A.bird,A.kareem,A.bking,A.mj,'Mark Eaton / Eaton'],
 ]},
{id:'draft-top3',layout:'table',cat:'Tables',title:'Top 3 Draft Picks (2000–2025)',t:600,desc:'Can you name the first three picks of every NBA Draft since 2000?',
 cols:['#1 Pick','#2 Pick','#3 Pick'],
 rows:[
 ['2025','Cooper Flagg / Flagg','Dylan Harper / Harper','VJ Edgecombe / V.J. Edgecombe / Edgecombe'],
 ['2024','Zaccharie Risacher / Risacher','Alex Sarr / Alexandre Sarr / Sarr','Reed Sheppard / Sheppard'],
 ['2023','Victor Wembanyama / Wembanyama / Wemby','Brandon Miller / Miller','Scoot Henderson / Scoot / Henderson'],
 ['2022','Paolo Banchero / Paolo / Banchero','Chet Holmgren / Chet / Holmgren','Jabari Smith Jr. / Jabari Smith / Smith'],
 ['2021','Cade Cunningham / Cade / Cunningham','Jalen Green / Green','Evan Mobley / Mobley'],
 ['2020','Anthony Edwards / Ant / Edwards / Ant-Man','James Wiseman / Wiseman','LaMelo Ball / LaMelo / Ball'],
 ['2019','Zion Williamson / Zion / Williamson','Ja Morant / Ja / Morant','RJ Barrett / R.J. Barrett / Barrett'],
 ['2018','Deandre Ayton / Ayton','Marvin Bagley / Marvin Bagley III / Bagley',A.luka],
 ['2017','Markelle Fultz / Fultz','Lonzo Ball / Lonzo / Ball','Jayson Tatum / Tatum'],
 ['2016','Ben Simmons / Simmons','Brandon Ingram / Ingram','Jaylen Brown / J Brown / Brown'],
 ['2015','Karl-Anthony Towns / KAT / Towns',"D'Angelo Russell / DLo / Russell / DAngelo Russell",'Jahlil Okafor / Okafor'],
 ['2014','Andrew Wiggins / Wiggins','Jabari Parker / Parker',A.embiid],
 ['2013','Anthony Bennett / Bennett','Victor Oladipo / Oladipo','Otto Porter / Otto Porter Jr. / Porter'],
 ['2012','Anthony Davis / AD / Davis','Michael Kidd-Gilchrist / Kidd-Gilchrist / MKG',A.beal],
 ['2011','Kyrie Irving / Kyrie / Irving','Derrick Williams / D Williams / Williams','Enes Kanter / Enes Freedom / Kanter / Freedom'],
 ['2010','John Wall / Wall','Evan Turner / Turner','Derrick Favors / Favors'],
 ['2009','Blake Griffin / Griffin','Hasheem Thabeet / Thabeet',A.harden],
 ['2008',A.rose,'Michael Beasley / Beasley','O.J. Mayo / OJ Mayo / Mayo'],
 ['2007','Greg Oden / Oden',A.kd,'Al Horford / Horford'],
 ['2006','Andrea Bargnani / Bargnani','LaMarcus Aldridge / Aldridge / LMA','Adam Morrison / Morrison'],
 ['2005','Andrew Bogut / Bogut','Marvin Williams / M Williams / Williams','Deron Williams / D Williams / D-Will'],
 ['2004','Dwight Howard / Dwight / Howard','Emeka Okafor / Okafor','Ben Gordon / Gordon'],
 ['2003',A.lbj,'Darko Milicic / Darko / Milicic / Miličić',A.melo],
 ['2002','Yao Ming / Yao / Ming','Jay Williams / Williams','Mike Dunleavy / Mike Dunleavy Jr. / Dunleavy'],
 ['2001','Kwame Brown / Kwame / Brown','Tyson Chandler / Chandler','Pau Gasol / Pau / Gasol'],
 ['2000','Kenyon Martin / K-Mart / Martin','Stromile Swift / Swift','Darius Miles / Miles'],
 ]},
{id:'mvp-top2',layout:'table',cat:'Tables',title:'MVP Winner & Runner-Up (2000–2025)',t:480,desc:'Can you name the MVP and the runner-up in MVP voting each season since 2000?',
 cols:['MVP','Runner-up'],
 rows:[
 ['2025',A.sga,A.jokic],['2024',A.jokic,A.sga],['2023',A.embiid,A.jokic],['2022',A.jokic,A.embiid],['2021',A.jokic,A.embiid],
 ['2020',A.giannis,A.lbj],['2019',A.giannis,A.harden],['2018',A.harden,A.lbj],['2017',A.russ,A.harden],['2016',A.curry,A.kawhi],
 ['2015',A.curry,A.harden],['2014',A.kd,A.lbj],['2013',A.lbj,A.kd],['2012',A.lbj,A.kd],['2011',A.rose,'Dwight Howard / Dwight / Howard'],
 ['2010',A.lbj,A.kd],['2009',A.lbj,A.kobe],['2008',A.kobe,'Chris Paul / CP3 / Paul'],['2007',A.dirk,A.nash],['2006',A.nash,A.lbj],
 ['2005',A.nash,A.shaq],['2004',A.kg,A.duncan],['2003',A.duncan,A.kg],['2002',A.duncan,'Jason Kidd / Kidd'],['2001',A.ai,A.duncan],['2000',A.shaq,A.kg],
 ]},
{id:'allnba-2025',layout:'table',cat:'Tables',title:'2024–25 All-NBA Teams',t:240,desc:'Can you name the 15 players on the 2024–25 All-NBA First, Second and Third Teams?',
 cols:['','','','',''],
 rows:[
 ['1st Team',A.sga,A.jokic,A.giannis,'Jayson Tatum / Tatum','Donovan Mitchell / Mitchell / Spida'],
 ['2nd Team','Jalen Brunson / Brunson',A.curry,'Anthony Edwards / Ant / Edwards / Ant-Man',A.lbj,'Evan Mobley / Mobley'],
 ['3rd Team','Cade Cunningham / Cade / Cunningham','Tyrese Haliburton / Haliburton / Hali',A.harden,'Karl-Anthony Towns / KAT / Towns','Jalen Williams / J-Dub / JDub / Williams'],
 ]},
{id:'reb-year',layout:'clued',cat:'Records',title:'Rebounding Champions by Year',t:720,desc:'Can you name the NBA rebounding leader for each season (1951–2025)?',items:L(`1951 | Dolph Schayes / Schayes
1952 | Larry Foust / Foust
1953 | George Mikan / Mikan
1954 | Harry Gallatin / Gallatin
1955 | Neil Johnston / Johnston
1956 | Bob Pettit / Pettit
1957 | Maurice Stokes / Stokes
1958 | Bill Russell / Russell
1959 | Bill Russell / Russell
1960 | Wilt Chamberlain / Wilt / Chamberlain
1961 | Wilt Chamberlain / Wilt / Chamberlain
1962 | Wilt Chamberlain / Wilt / Chamberlain
1963 | Wilt Chamberlain / Wilt / Chamberlain
1964 | Bill Russell / Russell
1965 | Bill Russell / Russell
1966 | Wilt Chamberlain / Wilt / Chamberlain
1967 | Wilt Chamberlain / Wilt / Chamberlain
1968 | Wilt Chamberlain / Wilt / Chamberlain
1969 | Wilt Chamberlain / Wilt / Chamberlain
1970 | Elvin Hayes / Hayes
1971 | Wilt Chamberlain / Wilt / Chamberlain
1972 | Wilt Chamberlain / Wilt / Chamberlain
1973 | Wilt Chamberlain / Wilt / Chamberlain
1974 | Elvin Hayes / Hayes
1975 | Wes Unseld / Unseld
1976 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
1977 | Bill Walton / Walton
1978 | Truck Robinson / Len Robinson / Robinson
1979 | Moses Malone / Moses / M Malone
1980 | Swen Nater / Nater
1981 | Moses Malone / Moses / M Malone
1982 | Moses Malone / Moses / M Malone
1983 | Moses Malone / Moses / M Malone
1984 | Moses Malone / Moses / M Malone
1985 | Moses Malone / Moses / M Malone
1986 | Bill Laimbeer / Laimbeer
1987 | Charles Barkley / Barkley
1988 | Michael Cage / Cage
1989 | Hakeem Olajuwon / Olajuwon / Hakeem
1990 | Hakeem Olajuwon / Olajuwon / Hakeem
1991 | David Robinson / Robinson / Admiral
1992 | Dennis Rodman / Rodman / Worm
1993 | Dennis Rodman / Rodman / Worm
1994 | Dennis Rodman / Rodman / Worm
1995 | Dennis Rodman / Rodman / Worm
1996 | Dennis Rodman / Rodman / Worm
1997 | Dennis Rodman / Rodman / Worm
1998 | Dennis Rodman / Rodman / Worm
1999 | Chris Webber / Webber / C-Webb
2000 | Dikembe Mutombo / Mutombo / Dikembe
2001 | Dikembe Mutombo / Mutombo / Dikembe
2002 | Ben Wallace / Wallace / Big Ben
2003 | Ben Wallace / Wallace / Big Ben
2004 | Kevin Garnett / Garnett / KG
2005 | Kevin Garnett / Garnett / KG
2006 | Kevin Garnett / Garnett / KG
2007 | Kevin Garnett / Garnett / KG
2008 | Dwight Howard / Dwight / Howard
2009 | Dwight Howard / Dwight / Howard
2010 | Dwight Howard / Dwight / Howard
2011 | Kevin Love / Love
2012 | Dwight Howard / Dwight / Howard
2013 | Dwight Howard / Dwight / Howard
2014 | DeAndre Jordan / Jordan / DJ
2015 | DeAndre Jordan / Jordan / DJ
2016 | Andre Drummond / Drummond
2017 | Hassan Whiteside / Whiteside
2018 | Andre Drummond / Drummond
2019 | Andre Drummond / Drummond
2020 | Andre Drummond / Drummond
2021 | Clint Capela / Capela
2022 | Rudy Gobert / Gobert
2023 | Domantas Sabonis / Sabonis
2024 | Domantas Sabonis / Sabonis
2025 | Domantas Sabonis / Sabonis`)},
{id:'ast-year',layout:'clued',cat:'Records',title:'Assist Leaders by Year',t:720,desc:'Can you name the NBA assists leader for each season (1947–2025)?',items:L(`1947 | Ernie Calverley / Calverley
1948 | Howie Dallmar / Dallmar
1949 | Bob Davies / Davies
1950 | Dick McGuire / McGuire
1951 | Andy Phillip / Phillip
1952 | Andy Phillip / Phillip
1953 | Bob Cousy / Cousy
1954 | Bob Cousy / Cousy
1955 | Bob Cousy / Cousy
1956 | Bob Cousy / Cousy
1957 | Bob Cousy / Cousy
1958 | Bob Cousy / Cousy
1959 | Bob Cousy / Cousy
1960 | Bob Cousy / Cousy
1961 | Oscar Robertson / Oscar / Robertson / Big O
1962 | Oscar Robertson / Oscar / Robertson / Big O
1963 | Guy Rodgers / Rodgers
1964 | Oscar Robertson / Oscar / Robertson / Big O
1965 | Oscar Robertson / Oscar / Robertson / Big O
1966 | Oscar Robertson / Oscar / Robertson / Big O
1967 | Guy Rodgers / Rodgers
1968 | Wilt Chamberlain / Wilt / Chamberlain
1969 | Oscar Robertson / Oscar / Robertson / Big O
1970 | Lenny Wilkens / Wilkens
1971 | Norm Van Lier / Van Lier
1972 | Jerry West / West
1973 | Nate Archibald / Tiny Archibald / Archibald
1974 | Ernie DiGregorio / DiGregorio / Ernie D
1975 | Kevin Porter / Porter
1976 | Slick Watts / Watts
1977 | Don Buse / Buse
1978 | Kevin Porter / Porter
1979 | Kevin Porter / Porter
1980 | Micheal Ray Richardson / Michael Ray Richardson / Richardson
1981 | Kevin Porter / Porter
1982 | Johnny Moore / Moore
1983 | Magic Johnson / Magic / Earvin Johnson
1984 | Magic Johnson / Magic / Earvin Johnson
1985 | Isiah Thomas / Isiah / Thomas
1986 | Magic Johnson / Magic / Earvin Johnson
1987 | Magic Johnson / Magic / Earvin Johnson
1988 | John Stockton / Stockton
1989 | John Stockton / Stockton
1990 | John Stockton / Stockton
1991 | John Stockton / Stockton
1992 | John Stockton / Stockton
1993 | John Stockton / Stockton
1994 | John Stockton / Stockton
1995 | John Stockton / Stockton
1996 | John Stockton / Stockton
1997 | Mark Jackson / Jackson
1998 | Rod Strickland / Strickland
1999 | Jason Kidd / Kidd
2000 | Jason Kidd / Kidd
2001 | Jason Kidd / Kidd
2002 | Andre Miller / Miller
2003 | Jason Kidd / Kidd
2004 | Steve Nash / Nash
2005 | Steve Nash / Nash
2006 | Steve Nash / Nash
2007 | Steve Nash / Nash
2008 | Chris Paul / CP3 / Paul
2009 | Chris Paul / CP3 / Paul
2010 | Steve Nash / Nash
2011 | Steve Nash / Nash
2012 | Rajon Rondo / Rondo
2013 | Rajon Rondo / Rondo
2014 | Chris Paul / CP3 / Paul
2015 | Chris Paul / CP3 / Paul
2016 | Rajon Rondo / Rondo
2017 | James Harden / Harden
2018 | Russell Westbrook / Westbrook / Russ
2019 | Russell Westbrook / Westbrook / Russ
2020 | LeBron James / LeBron / James
2021 | Russell Westbrook / Westbrook / Russ
2022 | Chris Paul / CP3 / Paul
2023 | James Harden / Harden
2024 | Tyrese Haliburton / Haliburton / Hali
2025 | Trae Young / Trae / Young`)},
{id:'abbr',layout:'clued',cat:'Teams',title:'Teams by Abbreviation',t:120,desc:'Can you name the NBA team for each three-letter abbreviation?',items:L(`ATL | Atlanta Hawks / Hawks
BOS | Boston Celtics / Celtics
BKN | Brooklyn Nets / Nets
CHA | Charlotte Hornets / Hornets
CHI | Chicago Bulls / Bulls
CLE | Cleveland Cavaliers / Cavaliers / Cavs
DAL | Dallas Mavericks / Mavericks / Mavs
DEN | Denver Nuggets / Nuggets
DET | Detroit Pistons / Pistons
GSW | Golden State Warriors / Warriors
HOU | Houston Rockets / Rockets
IND | Indiana Pacers / Pacers
LAC | Los Angeles Clippers / Clippers
LAL | Los Angeles Lakers / Lakers
MEM | Memphis Grizzlies / Grizzlies
MIA | Miami Heat / Heat
MIL | Milwaukee Bucks / Bucks
MIN | Minnesota Timberwolves / Timberwolves / Wolves
NOP | New Orleans Pelicans / Pelicans
NYK | New York Knicks / Knicks
OKC | Oklahoma City Thunder / Thunder
ORL | Orlando Magic / Magic
PHI | Philadelphia 76ers / 76ers / Sixers
PHX | Phoenix Suns / Suns
POR | Portland Trail Blazers / Trail Blazers / Blazers
SAC | Sacramento Kings / Kings
SAS | San Antonio Spurs / Spurs
TOR | Toronto Raptors / Raptors
UTA | Utah Jazz / Jazz
WAS | Washington Wizards / Wizards`)},
{id:'no-title',layout:'list',cat:'Champions',title:'Teams That Have Never Won a Title',t:90,desc:'Can you name the 10 current NBA franchises that have never won a championship?',items:L(`Brooklyn Nets / Nets
Charlotte Hornets / Hornets
Los Angeles Clippers / Clippers
Memphis Grizzlies / Grizzlies
Minnesota Timberwolves / Timberwolves / Wolves
New Orleans Pelicans / Pelicans
Orlando Magic / Magic
Phoenix Suns / Suns
Indiana Pacers / Pacers
Utah Jazz / Jazz`)},
{id:'franchise-scorers',layout:'clued',cat:'Records',title:'Franchise All-Time Scoring Leaders',t:480,desc:"Can you name each NBA franchise's all-time leading scorer (regular season)?",items:L(`Hawks | Dominique Wilkins / Dominique / Wilkins / Nique
Celtics | John Havlicek / Havlicek / Hondo
Nets | Buck Williams / Williams
Hornets | Kemba Walker / Kemba / Walker
Bulls | Michael Jordan / Jordan / MJ
Cavaliers | LeBron James / LeBron / James
Mavericks | Dirk Nowitzki / Dirk / Nowitzki
Nuggets | Alex English / English
Pistons | Isiah Thomas / Isiah / Thomas
Warriors | Stephen Curry / Steph Curry / Curry / Steph
Rockets | Hakeem Olajuwon / Olajuwon / Hakeem
Pacers | Reggie Miller / Reggie / Miller
Clippers | Randy Smith / Smith / Elton Brand / Brand
Lakers | Kobe Bryant / Kobe / Bryant
Grizzlies | Mike Conley / Conley / Marc Gasol / Gasol
Heat | Dwyane Wade / Wade
Bucks | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Timberwolves | Kevin Garnett / Garnett / KG
Pelicans | Anthony Davis / AD / Davis
Knicks | Patrick Ewing / Ewing
Thunder | Russell Westbrook / Westbrook / Russ
Magic | Dwight Howard / Dwight / Howard
76ers | Hal Greer / Greer
Suns | Walter Davis / Davis
Trail Blazers | Clyde Drexler / Drexler / Glide
Kings | Oscar Robertson / Oscar / Robertson / Big O
Spurs | Tim Duncan / Duncan
Raptors | DeMar DeRozan / DeRozan
Jazz | Karl Malone / K Malone / Mailman
Wizards | Elvin Hayes / Hayes`)},
{id:'lakers-retired',layout:'clued',cat:'Lists',title:'Lakers Retired Numbers',t:180,desc:'Can you name the Lakers player behind each retired jersey number?',items:L(`8 | Kobe Bryant / Kobe / Bryant
13 | Wilt Chamberlain / Wilt / Chamberlain
16 | Pau Gasol / Pau / Gasol
21 | Michael Cooper / Cooper
22 | Elgin Baylor / Baylor
24 | Kobe Bryant / Kobe / Bryant
25 | Gail Goodrich / Goodrich
32 | Magic Johnson / Magic / Earvin Johnson
33 | Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
34 | Shaquille O'Neal / Shaq / O'Neal / Oneal
42 | James Worthy / Worthy
44 | Jerry West / West
52 | Jamaal Wilkes / Wilkes
99 | George Mikan / Mikan`)},
{id:'celtics-retired',layout:'clued',cat:'Lists',title:'Celtics Retired Numbers',t:300,desc:'Can you name the Celtic behind each retired number?',items:L(`00 | Robert Parish / Parish / Chief
1 | Walter Brown / Brown
2 | Red Auerbach / Auerbach
3 | Dennis Johnson / D Johnson / DJ / Johnson
5 | Kevin Garnett / Garnett / KG
6 | Bill Russell / Russell
10 | Jo Jo White / JoJo White / White
14 | Bob Cousy / Cousy
15 | Tom Heinsohn / Heinsohn
16 | Satch Sanders / Tom Sanders / Sanders
17 | John Havlicek / Havlicek / Hondo
18 | Dave Cowens / Cowens
19 | Don Nelson / Nelson
21 | Bill Sharman / Sharman
22 | Ed Macauley / Macauley
23 | Frank Ramsey / Ramsey
24 | Sam Jones / Jones
25 | K.C. Jones / KC Jones
31 | Cedric Maxwell / Maxwell / Cornbread
32 | Kevin McHale / McHale
33 | Larry Bird / Bird
34 | Paul Pierce / Pierce
35 | Reggie Lewis / Lewis`)},
{id:'bulls-retired',layout:'clued',cat:'Lists',title:'Bulls Retired Numbers',t:60,desc:'Can you name the Bull behind each retired number?',items:L(`4 | Jerry Sloan / Sloan
10 | Bob Love / Love
23 | Michael Jordan / Jordan / MJ
33 | Scottie Pippen / Pippen`)},
{id:'playoff-pts',layout:'list',cat:'Records',title:'Playoff Scoring Leaders',t:180,desc:'Can you name the top 10 in career playoff points?',items:L(`LeBron James / LeBron / James
Michael Jordan / Jordan / MJ
Kareem Abdul-Jabbar / Kareem / Abdul-Jabbar
Kobe Bryant / Kobe / Bryant
Shaquille O'Neal / Shaq / O'Neal / Oneal
Tim Duncan / Duncan
Kevin Durant / Durant / KD
Karl Malone / K Malone / Mailman
Jerry West / West
Stephen Curry / Steph Curry / Curry / Steph`)},
{id:'lottery-2025',layout:'clued',cat:'Draft',title:'2025 Draft Lottery Picks',t:240,desc:'Can you name the 14 lottery picks of the 2025 NBA Draft?',items:L(`1 | Cooper Flagg / Flagg
2 | Dylan Harper / Harper
3 | VJ Edgecombe / V.J. Edgecombe / Edgecombe
4 | Kon Knueppel / Knueppel
5 | Ace Bailey / Bailey
6 | Tre Johnson / Johnson
7 | Jeremiah Fears / Fears
8 | Egor Demin / Demin
9 | Collin Murray-Boyles / Murray-Boyles
10 | Khaman Maluach / Maluach
11 | Cedric Coward / Coward
12 | Noa Essengue / Essengue
13 | Derik Queen / Queen
14 | Carter Bryant / Bryant`)},
{id:'conf',layout:'clued',cat:'Teams',title:'Teams by Conference',t:240,desc:'Can you name the 15 teams in each conference?',items:L(`East | Atlanta Hawks / Hawks
East | Boston Celtics / Celtics
East | Brooklyn Nets / Nets
East | Charlotte Hornets / Hornets
East | Chicago Bulls / Bulls
East | Cleveland Cavaliers / Cavaliers / Cavs
East | Detroit Pistons / Pistons
East | Indiana Pacers / Pacers
East | Miami Heat / Heat
East | Milwaukee Bucks / Bucks
East | New York Knicks / Knicks
East | Orlando Magic / Magic
East | Philadelphia 76ers / 76ers / Sixers
East | Toronto Raptors / Raptors
East | Washington Wizards / Wizards
West | Dallas Mavericks / Mavericks / Mavs
West | Denver Nuggets / Nuggets
West | Golden State Warriors / Warriors
West | Houston Rockets / Rockets
West | Los Angeles Clippers / Clippers
West | Los Angeles Lakers / Lakers
West | Memphis Grizzlies / Grizzlies
West | Minnesota Timberwolves / Timberwolves / Wolves
West | New Orleans Pelicans / Pelicans
West | Oklahoma City Thunder / Thunder / OKC
West | Phoenix Suns / Suns
West | Portland Trail Blazers / Trail Blazers / Blazers
West | Sacramento Kings / Kings
West | San Antonio Spurs / Spurs
West | Utah Jazz / Jazz`)},
];
// apply meta + add tables
QUIZZES.forEach(q=>{ const m=META[q.id]; if(m){ q.cat=q.cat||m.cat; q.desc=q.desc||m.desc; } if(!q.layout) q.layout=q.items&&q.items.some(l=>l.includes('|'))?'clued':'list'; });
TABLES.forEach(q=>QUIZZES.push(q));
