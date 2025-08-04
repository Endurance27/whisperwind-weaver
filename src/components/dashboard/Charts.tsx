import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";

const topicData = [
  { name: 'PwDs', value: 120 },
  { name: 'VAW', value: 95 },
  { name: 'Mental Health', value: 85 },
  { name: 'LGBTQ+', value: 70 },
];

const hashtagData = [
  { name: '#PwDs', value: 150 },
  { name: '#GBV', value: 130 },
  { name: '#MentalHealth', value: 110 },
  { name: '#Equality', value: 95 },
];

const sentimentData = [
  { name: 'Positive', value: 46, color: 'hsl(var(--positive-sentiment))' },
  { name: 'Neutral', value: 30, color: 'hsl(var(--neutral-sentiment))' },
  { name: 'Negative', value: 24, color: 'hsl(var(--negative-sentiment))' },
];

const weeklyTrendsData = [
  { day: 'Mon', tweets: 245, engagements: 156 },
  { day: 'Tue', tweets: 235, engagements: 142 },
  { day: 'Wed', tweets: 220, engagements: 138 },
  { day: 'Thu', tweets: 240, engagements: 165 },
  { day: 'Fri', tweets: 225, engagements: 148 },
  { day: 'Sat', tweets: 210, engagements: 135 },
  { day: 'Sun', tweets: 255, engagements: 172 },
];

const COLORS = ['hsl(var(--analytics-purple))', 'hsl(var(--analytics-pink))', 'hsl(var(--analytics-blue))', 'hsl(var(--analytics-orange))'];

const chartConfig = {
  tweets: {
    label: "Tweets",
  },
  engagements: {
    label: "Engagements",
  },
};

export function TweetsByTopicChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tweets by Topic</CardTitle>
        <p className="text-sm text-muted-foreground">Distribution of tweets across different topics</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="hsl(var(--analytics-purple))" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function TopHashtagsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Hashtags</CardTitle>
        <p className="text-sm text-muted-foreground">Most frequently used hashtags</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hashtagData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="hsl(var(--analytics-teal))" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function SentimentAnalysisChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tweet Sentiment Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">Distribution of positive, negative and neutral sentiment</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function WeeklyTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Tweet Trends</CardTitle>
        <p className="text-sm text-muted-foreground">Tweet volume and engagement over the past week</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tweets" 
                stroke="hsl(var(--analytics-blue))" 
                strokeWidth={3}
                name="Tweets"
              />
              <Line 
                type="monotone" 
                dataKey="engagements" 
                stroke="hsl(var(--analytics-purple))" 
                strokeWidth={3}
                name="Engagements"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}