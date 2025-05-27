
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X, Users } from 'lucide-react';

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
  logic?: 'AND' | 'OR';
}

const RuleBuilder = () => {
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', field: '', operator: '', value: '' }
  ]);

  const fields = [
    { value: 'total_spent', label: 'Total Spent' },
    { value: 'order_count', label: 'Order Count' },
    { value: 'last_order_date', label: 'Last Order Date' },
    { value: 'registration_date', label: 'Registration Date' },
    { value: 'city', label: 'City' },
    { value: 'age', label: 'Age' }
  ];

  const operators = {
    total_spent: [
      { value: 'gt', label: '>' },
      { value: 'lt', label: '<' },
      { value: 'eq', label: '=' },
      { value: 'gte', label: '>=' },
      { value: 'lte', label: '<=' }
    ],
    order_count: [
      { value: 'gt', label: '>' },
      { value: 'lt', label: '<' },
      { value: 'eq', label: '=' }
    ],
    city: [
      { value: 'eq', label: 'equals' },
      { value: 'contains', label: 'contains' }
    ],
    default: [
      { value: 'gt', label: '>' },
      { value: 'lt', label: '<' },
      { value: 'eq', label: '=' }
    ]
  };

  const addRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      field: '',
      operator: '',
      value: '',
      logic: 'AND'
    };
    setRules([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id: string, field: keyof Rule, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const getOperators = (field: string) => {
    return operators[field as keyof typeof operators] || operators.default;
  };

  // Calculate estimated audience size based on rules
  const estimatedAudience = Math.floor(Math.random() * 1000) + 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Audience Rules</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>Est. audience: <strong>{estimatedAudience}</strong> customers</span>
        </div>
      </div>

      <div className="space-y-3">
        {rules.map((rule, index) => (
          <Card key={rule.id} className="border-l-4 border-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                {index > 0 && (
                  <Select 
                    value={rule.logic} 
                    onValueChange={(value) => updateRule(rule.id, 'logic', value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AND">AND</SelectItem>
                      <SelectItem value="OR">OR</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <Select 
                  value={rule.field} 
                  onValueChange={(value) => updateRule(rule.id, 'field', value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map(field => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={rule.operator} 
                  onValueChange={(value) => updateRule(rule.id, 'operator', value)}
                  disabled={!rule.field}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Op" />
                  </SelectTrigger>
                  <SelectContent>
                    {getOperators(rule.field).map(op => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input 
                  placeholder="Value"
                  value={rule.value}
                  onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
                  className="w-32"
                />

                {rules.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeRule(rule.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        variant="outline" 
        onClick={addRule}
        className="w-full border-dashed border-2 hover:border-blue-500 hover:text-blue-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Rule
      </Button>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Rule Summary</h4>
        <p className="text-sm text-blue-700">
          {rules.length === 1 && !rules[0].field ? 
            'No rules defined - will target all customers' :
            `Targeting customers where ${rules.map((rule, index) => 
              `${index > 0 ? ` ${rule.logic} ` : ''}${rule.field} ${rule.operator} ${rule.value}`
            ).join('')}`
          }
        </p>
      </div>
    </div>
  );
};

export default RuleBuilder;
