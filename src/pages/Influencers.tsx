import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";

const topInfluencers = [
  {
    id: 1,
    name: "Nana Ama McBrown",
    handle: "@iamamamcbrown",
    followers: "4.5M",
    posts: "87 posts",
    engagement: "18.3% engagement",
    topics: ["Mental Health", "VAW"],
  },
  {
    id: 2,
    name: "Sam George",
    handle: "@samgeorge",
    followers: "2.1M",
    posts: "52 posts", 
    engagement: "15.8% engagement",
    topics: ["PwDs", "LGBTQ"],
  },
  {
    id: 3,
    name: "Abena Korkor",
    handle: "@missabenakorkor",
    followers: "1.8M",
    posts: "112 posts",
    engagement: "22.3% engagement",
    topics: ["Mental Health"],
  },
  {
    id: 4,
    name: "Lydia Forson",
    handle: "@lydiaforson",
    followers: "3.2M",
    posts: "148 posts",
    engagement: "17.3% engagement",
    topics: ["VAW", "LGBTQ"],
  },
  {
    id: 5,
    name: "Kaly Jay",
    handle: "@kalyjay",
    followers: "6.5M",
    posts: "907 posts",
    engagement: "19.3% engagement",
    topics: ["PwDs", "VAW"],
  },
];

const contentMetrics = [
  { category: "persons with disabilities (PwDs) Content", value: 3245, color: "bg-category-pwds" },
  { category: "violence against women (VAW) Content", value: 4178, color: "bg-category-vaw" },
  { category: "Mental Health Content", value: 5293, color: "bg-category-mental" },
  { category: "LGBTQ Content", value: 1874, color: "bg-category-lgbtq" },
];

const topicDistribution = [
  { name: "PwDs", value: 40, color: "hsl(var(--pwds-color))" },
  { name: "Mental Health", value: 28, color: "hsl(var(--mental-health-color))" },
  { name: "VaW", value: 20, color: "hsl(var(--vaw-color))" },
  { name: "LGBTQ", value: 12, color: "hsl(var(--lgbtq-color))" },
];

const chartConfig = {
  value: {
    label: "Percentage",
  },
};

const Influencers = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Content Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentMetrics.map((metric) => (
            <Card key={metric.category} className={`border-0 shadow-sm text-white ${metric.color}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  {metric.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value.toLocaleString()}</div>
                <p className="text-xs opacity-75 mt-1">Posts this month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Ghana Influencers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top Ghana Influencers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topInfluencers.map((influencer, index) => (
                <div key={influencer.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-analytics-blue text-white text-xs flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{influencer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{influencer.name}</h3>
                      <span className="text-xs text-muted-foreground">{influencer.handle}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>{influencer.followers}</span>
                      <span>{influencer.posts}</span>
                      <span className="text-analytics-green">{influencer.engagement}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {influencer.topics.map((topic) => (
                        <Badge 
                          key={topic} 
                          variant="secondary" 
                          className={`text-xs ${
                            topic === "Mental Health" ? "bg-category-mental/20 text-category-mental" :
                            topic === "VAW" ? "bg-category-vaw/20 text-category-vaw" :
                            topic === "PwDs" ? "bg-category-pwds/20 text-category-pwds" :
                            "bg-category-lgbtq/20 text-category-lgbtq"
                          }`}
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Topic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Topic Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topicDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {topicDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <div className="mt-4 space-y-2">
                <div className="text-sm font-semibold">persons with disabilities (PwDs) 40%</div>
                <div className="text-sm font-semibold text-category-mental">Mental Health 28%</div>
                <div className="text-sm font-semibold text-category-vaw">violence against women (VAW) 20%</div>
                <div className="text-sm font-semibold text-category-lgbtq">LGBTQ 12%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trending Hashtags and Most Trending Post */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Trending Hashtags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { hashtag: "#EndGBVInGhana", category: "VAW", mentions: 4256, growth: "+23%" },
                  { hashtag: "#MentalHealthAwareness", category: "Mental Health", mentions: 3872, growth: "+18%" },
                  { hashtag: "#SpeakUpGhana", category: "VAW", mentions: 1893, growth: "+12%" },
                  { hashtag: "#HumanRightsForAll", category: "LGBTQ", mentions: 1765, growth: "+9%" },
                  { hashtag: "#BreakTheStigma", category: "Mental Health", mentions: 4256, growth: "+27%" },
                  { hashtag: "#InclusiveEducation", category: "PwDs", mentions: 3245, growth: "+15%" },
                ].map((item) => (
                  <div key={item.hashtag} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          item.category === "Mental Health" ? "bg-category-mental/20 text-category-mental" :
                          item.category === "VAW" ? "bg-category-vaw/20 text-category-vaw" :
                          item.category === "PwDs" ? "bg-category-pwds/20 text-category-pwds" :
                          "bg-category-lgbtq/20 text-category-lgbtq"
                        }`}
                      >
                        {item.category}
                      </Badge>
                      <span className="font-medium">{item.hashtag}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{item.mentions.toLocaleString()}</div>
                      <div className="text-xs text-analytics-green">{item.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Most Trending Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-analytics-blue text-white text-sm flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Abena Korkor</h4>
                    <p className="text-sm text-muted-foreground">@missabenakorkor • 3days ago</p>
                  </div>
                  <Badge className="bg-category-mental/20 text-category-mental">Mental Health</Badge>
                </div>
                
                <p className="text-sm leading-relaxed">
                  Your mental health matters. Don't be afraid to seek help when you need it. #MentalHealthAwareness #BreakTheStigma
                </p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span><strong className="text-foreground">31,289</strong> likes</span>
                  <span><strong className="text-foreground">12,453</strong> shares</span>
                </div>

                <div className="mt-6">
                  <h5 className="font-semibold text-sm mb-3">Other Trending Posts</h5>
                  <div className="space-y-3">
                    {[
                      { name: "Lydia Forson", category: "VAW", likes: "31,289" },
                      { name: "Kwame Dzifa", category: "PwDs", likes: "18,289" },
                      { name: "Lydia Forson", category: "LGBTQ", likes: "19,589" },
                    ].map((post, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{post.name}</span>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              post.category === "VAW" ? "bg-category-vaw/20 text-category-vaw" :
                              post.category === "PwDs" ? "bg-category-pwds/20 text-category-pwds" :
                              "bg-category-lgbtq/20 text-category-lgbtq"
                            }`}
                          >
                            {post.category}
                          </Badge>
                        </div>
                        <span className="text-muted-foreground">{post.likes} likes</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Influencers;