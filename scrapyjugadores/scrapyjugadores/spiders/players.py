import scrapy 

class Players(scrapy.Spider):
    name='players'
    start_urls=[
        'https://www.futbin.com/23/players'
    ]
    custom_settings={
        'FEED_URI': 'jugadores.csv',
        'FEED_FORMAT': 'csv',
        'ROBOTSTXT_OBEY': True,
        'FEED_EXPORT_ENCODING': 'utf-8'
    }
    def parse(self, response):
        table=response.xpath('//*[@class="player_name_players_table get-tp"]')
      
        print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        #print(table)

        rows=table.xpath('//tr').extract()
        row=rows[1]
        print(row)
       
        #print(row.xpath('/tr/td'))
       # for row in rows:  
        #   player=row.xpath('//*[@class="player_name_players_table get-tp"]')
        #   print("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
        #   print(row)
        #   print("************************************")
        #   print(player)
         #  print("###################################")
        #yield{
    
           #'jugadores':player
        #}
    