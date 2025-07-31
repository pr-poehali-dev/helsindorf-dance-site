import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, day: 'Понедельник', time: '19:00', title: 'Хип-хоп для начинающих', instructor: 'Анна Петрова' },
    { id: 2, day: 'Среда', time: '20:00', title: 'Современная хореография', instructor: 'Михаил Козлов' },
    { id: 3, day: 'Пятница', time: '18:30', title: 'Джаз-фанк', instructor: 'Елена Сидорова' },
    { id: 4, day: 'Суббота', time: '15:00', title: 'Детская группа', instructor: 'Ольга Иванова' },
  ]);

  const [editingClass, setEditingClass] = useState(null);
  const [newClass, setNewClass] = useState({ day: '', time: '', title: '', instructor: '' });

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setNewClass(classItem);
  };

  const handleSaveClass = () => {
    if (editingClass) {
      setSchedule(schedule.map(item => 
        item.id === editingClass.id ? { ...newClass, id: editingClass.id } : item
      ));
    } else {
      setSchedule([...schedule, { ...newClass, id: Date.now() }]);
    }
    setEditingClass(null);
    setNewClass({ day: '', time: '', title: '', instructor: '' });
  };

  const handleDeleteClass = (id) => {
    setSchedule(schedule.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black/80"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="https://cdn.poehali.dev/files/75683e5c-0f0a-4c25-b3ff-9169718a9cc4.png" 
              alt="Helsindorf Logo" 
              className="w-32 h-32 mx-auto mb-6 object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">HELSINDORF</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">Танцевальная студия для тех, кто живёт движением</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              <Icon name="Calendar" className="mr-2" size={20} />
              Записаться на занятие
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
              <Icon name="Play" className="mr-2" size={20} />
              Смотреть видео
            </Button>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Расписание занятий</h2>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {schedule.map(classItem => (
              <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-primary text-white">{classItem.day}</Badge>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditClass(classItem)}>
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteClass(classItem.id)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{classItem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Clock" className="mr-2" size={16} />
                      {classItem.time}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="User" className="mr-2" size={16} />
                      {classItem.instructor}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add/Edit Class Form */}
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>{editingClass ? 'Редактировать занятие' : 'Добавить новое занятие'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">День недели</label>
                <Input 
                  value={newClass.day}
                  onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                  placeholder="Понедельник"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Время</label>
                <Input 
                  value={newClass.time}
                  onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                  placeholder="19:00"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Название</label>
                <Input 
                  value={newClass.title}
                  onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                  placeholder="Хип-хоп для начинающих"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Преподаватель</label>
                <Input 
                  value={newClass.instructor}
                  onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                  placeholder="Анна Петрова"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveClass} className="flex-1">
                  {editingClass ? 'Сохранить' : 'Добавить'}
                </Button>
                {editingClass && (
                  <Button variant="outline" onClick={() => {
                    setEditingClass(null);
                    setNewClass({ day: '', time: '', title: '', instructor: '' });
                  }}>
                    Отмена
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Галерея</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform">
              <img 
                src="/img/500123e4-6cca-49a5-b75a-ddecd6894dab.jpg" 
                alt="Hip-hop танцы в студии"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform">
              <img 
                src="/img/6aba748c-6a35-4d69-bc4e-1d90fa848edd.jpg" 
                alt="Современная хореография"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform">
              <img 
                src="/img/ad758659-0899-40c8-a09b-a6540a71714b.jpg" 
                alt="Jazz-funk урок"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-gradient-to-br from-secondary/30 to-primary/30 rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
              <Icon name="Music" size={48} className="text-muted-foreground" />
            </div>
            <div className="aspect-square bg-gradient-to-br from-primary/25 to-secondary/25 rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
              <Icon name="Users" size={48} className="text-muted-foreground" />
            </div>
            <div className="aspect-square bg-gradient-to-br from-secondary/25 to-primary/25 rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
              <Icon name="Star" size={48} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="MapPin" className="mr-2" size={24} />
                  Адрес студии
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">г. Москва, ул. Танцевальная, д. 42</p>
                <div className="flex items-center">
                  <Icon name="Phone" className="mr-2" size={18} />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Mail" className="mr-2" size={18} />
                  <span>info@helsindorf.ru</span>
                </div>
                <Button className="w-full">
                  <Icon name="Send" className="mr-2" size={18} />
                  Связаться в Telegram
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Отправить сообщение</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input placeholder="Телефон или Email" />
                <Textarea placeholder="Сообщение" rows={4} />
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Отправить
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-4">
            <img 
              src="https://cdn.poehali.dev/files/75683e5c-0f0a-4c25-b3ff-9169718a9cc4.png" 
              alt="Helsindorf Logo" 
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">HELSINDORF</h3>
          <p className="text-gray-400 mb-4">Танцевальная студия • Москва • 2025</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              <Icon name="Instagram" size={24} />
            </a>
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              <Icon name="Send" size={24} />
            </a>
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              <Icon name="Youtube" size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;