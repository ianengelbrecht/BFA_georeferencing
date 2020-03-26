var findMatches = require('../findMatches')

var targetArray = ['6 KM FROM STORMS RIVER MOUTH TO KNYSNA',
'9km van Dordrecht na Barkley-Oos. Stormbergplato.',
'ABERDEEN DIV.; 9 MI. W. BY S. OF TOWN',
'ABERDEEN DIV.; KIVIETSKUIL; 1 MI. S. OF KIVIETSKUIL',
'About 15 km East of Rhodes: Mavis Bank Farm; On Kloppershoek turn off, on sand banks in stream bed. Stream.',
'About 15 km East of Rhodes; Mavis Bank Farm;  On Kloppershoek turn off, highest peak North west of house.',
'About 15 km East of Rhodes; Mavis Bank Farm; On Kloppershoek turn off, plateau beyond highest peak North-West of house.',
'About 37 km from East London on R72 at the crossing with the Kayser\'s Beach - Mt Pleasant road.',
'About 5 km above Nico Malan Pass; Mid-slope of a rocky outcrop.',
'About 50 km E of Middelburg, Farm Schilderkrans. On rocky ridge N of farmhouse.',
'About 58km from Humansdorp. Hansmeerrivier.',
'ABOVE CAMBRIA ON WAY TO BAVIAANSKLOOF.',
'Above Joubertina. Wagenbooms river.',
'Above Port St. Johns. Along road to Arm Camp.',
'Above Sikuba River, Transkei.',
'Addo Bush, C. Col.',
'ADDO ELEPHANT NAITONAL. PARK; ZUURKOP',
'ADDO ELEPHANT NAT. P; RENOSTERKAMP',
'ADDO ELEPHANT NAT. P; RHINO CAMP',
'ADDO ELEPHANT NAT. P; RHINO CAMP',
'ADDO ELEPHANT NAT. P; SPEKBOOM WINDMILL',
'ADDO ELEPHANT NAT. P; ZUURKOP',
'ADDO ELEPHANT NAT. PARK.',
'ADDO ELEPHANT NAT. PARK; RUSKAMP.',
'ADDO ELEPHANT NATIONAL. PARK; RHINO CAMP',
'ADDO RESERVE',
'ADDO; IN VALLEY',
'Adelaide Dist. Farm Finella Falls 1, river upstream of falls. Along stream above head of Finella Gorge. 32°22\'56\'S 26°23\'24\'E.',
'ADELAIDE DIST.; GROENEBERG PASS; 4 MI. S. OF TOP OF GROENEBERG PASS',
'Akkerdal District. W of Kudu Kaya; plateau, next to road.',
'Akkerdal District. W of Kudu Kaya; plateau, next to road.',
'ALBANY',
'ALBANY',
'ALBANY DIST',
'ALBANY DIST.']

var testArray = ["albbannny D", 'Addo Elephant National Park, Zuurkop (limestone koppie) 3325BD', "Humansdorp"]

testArray.forEach(item => {
  console.log('Matches for ' + item + ":\r\n\r\n")
  var matches = findMatches(item.toLocaleLowerCase(), targetArray.map(item => item.toLocaleLowerCase()), 0.5)
  var matchesString = matches.join("--")
  console.log(matchesString + "\r\n\r\n")
})




